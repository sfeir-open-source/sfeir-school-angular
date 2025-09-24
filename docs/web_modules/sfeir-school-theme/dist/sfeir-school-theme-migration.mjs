#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
// #region Règles de migration
// Règles V3 -> V4 avec le bon ordre
const V3_TO_V4_RULES = {
    MARKDOWN: [
        // 1. Icônes avec style (plus spécifique en premier)
        {
            from: /(!\[sfeir-icons([^\]]*)\]\(([^)]+)\))<!-- \.element: style=\"([^\"]*)\" -->/g,
            to: (_match, _markdownImage, modifiers, iconName, styleContent) => {
                let classes = 'tc-icons feather';
                if (modifiers.includes('small'))
                    classes += ' tc-small';
                if (modifiers.includes('big'))
                    classes += ' tc-big';
                const newImage = `![](${iconName} '${classes}')`;
                const newStyleContent = styleContent
                    .replace(/--icon-size/g, '--tc-icon-size')
                    .replace(/--icon-color/g, '--tc-icon-color');
                const newStyleComment = `<!-- .element: style="${newStyleContent}" -->`;
                return newImage + newStyleComment;
            },
        },
        // 2. Icônes sans style
        {
            from: /!\[sfeir-icons([^\]]*)\]\(([^)]+)\)(?!<!-- \.element: style=)/g,
            to: (_match, modifiers, iconName) => {
                let classes = 'tc-icons feather';
                if (modifiers.includes('small'))
                    classes += ' tc-small';
                if (modifiers.includes('big'))
                    classes += ' tc-big';
                return `![](${iconName} '${classes}')`;
            },
        },
        // 3. Images avec classes h- ou w- (plus générique)
        {
            from: /!\[([^\]]*?(?:h-|w-)[^\]]*)\]\(([^)]+)\)/g,
            to: "![]($2 '$1')",
        },
        // 4. Images avec autres classes CSS (float-left, float-right, etc.)
        {
            from: /!\[([^\]]+)\]\(([^)]+)\)(?!<!-- \.element:)/g,
            to: "![]($2 '$1')",
        },
        // 4. Autres règles
        { from: /data-background-image-light/g, to: 'data-background-light' },
        { from: /data-background-image-dark/g, to: 'data-background-dark' },
    ],
    HTML: [
        {
            from: /href=\"([^\"]*)\/sfeir-school-theme\/sfeir-school-theme.css\"/g,
            to: 'href="$1/sfeir-school-theme/dist/sfeir-school-theme.css"',
        },
    ],
    JAVASCRIPT: [
        {
            from: /(['"])([^'"]*\/sfeir-school-theme)\/sfeir-school-theme\.mjs(['"])/g,
            to: '$1$2/dist/sfeir-school-theme.mjs$3',
        },
    ],
};
// #endregion
function applyRules(content, rules) {
    let newContent = content;
    for (const rule of rules) {
        newContent = newContent.replace(rule.from, rule.to);
    }
    return newContent;
}
function migrateMultiColumnSlides(content) {
    // Diviser le contenu en sections délimitées par ##==##
    const sections = content.split(/(##==##)/);
    const processedSections = sections.map((section) => {
        // Ne pas traiter les séparateurs ##==##
        if (section === '##==##') {
            return section;
        }
        // Chercher s'il y a un slide multi-colonnes dans cette section
        const multiColumnMatch = section.match(/([\s\S]*?)(<!-- \.slide: class=\"[^\"]*(?:two-column-layout|two-column)[^\"]*\"[^>]*-->)([\s\S]*)/);
        if (!multiColumnMatch) {
            return section; // Pas de slide multi-colonnes, on retourne tel quel
        }
        console.log('Migrating a multi-column slide...');
        const [, contentBefore, slideTag, slideContent] = multiColumnMatch;
        // Nettoyer le contenu avant
        const cleanContentBefore = contentBefore.trim();
        // Remplacer la classe dans le tag de slide
        const newSlideTag = slideTag.replace(/(?:two-column-layout|two-column)/g, 'tc-multiple-columns');
        // Séparer les Notes du contenu principal avec la regex robuste
        const notesMatch = slideContent.match(/(Notes:\s*[\s\S]*?)(?=##--##|##==##|$)/);
        const notes = notesMatch ? notesMatch[1].trim() : '';
        // Enlever les Notes du contenu pour traiter les colonnes
        let contentWithoutNotes = slideContent;
        if (notes) {
            contentWithoutNotes = slideContent
                .replace(/(Notes:\s*[\s\S]*?)(?=##--##|##==##|$)/, '')
                .trim();
        }
        // Diviser le contenu en colonnes en utilisant ##--##
        const columns = contentWithoutNotes.split(/##--##/);
        // Traiter chaque colonne
        const processedColumns = columns
            .map((col, colIndex) => {
            col = col.trim();
            // Pour la première colonne, ajouter le contenu qui était avant le slide tag
            if (colIndex === 0 && cleanContentBefore) {
                col = cleanContentBefore + '\n\n' + col;
            }
            // Vérifier si la colonne contient un tag de slide
            const slideMatch = col.match(/<!--\s*\.slide:\s*([^>]*?)\s*-->/);
            if (slideMatch) {
                // Extraire les attributs de la slide
                const slideAttributes = slideMatch[1].trim();
                // Extraire le contenu après le tag de slide
                const contentAfterSlideTag = col
                    .replace(/<!--\s*\.slide:\s*[^>]*?\s*-->/, '')
                    .trim();
                if (contentAfterSlideTag) {
                    return `##++## ${slideAttributes}\n\n${contentAfterSlideTag}`;
                }
                else {
                    return `##++## ${slideAttributes}`;
                }
            }
            else {
                // Si c'est du contenu normal, on l'entoure de ##++##
                if (col.length > 0) {
                    return `##++##\n\n${col}`;
                }
                return '##++##\n';
            }
        })
            .filter((col) => col.length > 0);
        // Reconstruire le slide
        let result = newSlideTag + '\n\n' + processedColumns.join('\n##++##\n');
        // Ajouter ##++## à la fin
        if (!result.endsWith('##++##')) {
            result += '\n##++##\n';
        }
        // Ajouter les Notes à la fin si elles existent
        if (notes) {
            result += '\n\n' + notes;
        }
        return result;
    });
    return processedSections.join('\n');
}
function migrateSpeakerSlides(content) {
    const slideRegex = /(<!-- \.slide: class=\"[^\"]*\bspeaker-slide\b[^\"]*\"[^>]* -->)\s*([\s\S]*?)(?=\n<!-- \.slide:|##==##|##--##|Notes:|$)/g;
    return content.replace(slideRegex, (_fullMatch, slideTag, slideContent) => {
        console.log('Migrating a speaker slide...');
        // D'abord, appliquer les règles d'images sur le contenu de la slide
        let processedContent = slideContent;
        // Appliquer les règles d'images spécifiquement
        processedContent = processedContent.replace(/!\[([^\]]*)\]\(([^)]+)\)/g, (_match, alt, src) => `![](${src} '${alt}')`);
        // Remove comments with class=\"icon..."
        processedContent = processedContent.replace(/<!-- \.element: class=\"icon[^\"]*\" -->/g, '');
        // Remove 'first-badge', 'second-badge', 'third-badge' (au cas où)
        processedContent = processedContent.replace(/(first-badge|second-badge|third-badge)/g, 'badge');
        // Ajouter des lignes vides après chaque image (sauf si elle est déjà suivie d'une ligne vide)
        processedContent = processedContent.replace(/!\[[^\]]*\]\([^)]+\s+'[^']+'\)(?!\n\s*\n)/g, (match) => match + '\n');
        // Nettoyer les lignes vides multiples (plus de 2 consécutives)
        processedContent = processedContent.replace(/\n{3,}/g, '\n\n');
        // Wrap in a div
        const newContent = `<div class="speaker-slide">\n\n${processedContent.trim()}\n\n</div>`;
        return `${slideTag}\n\n${newContent}\n\n`;
    });
}
function processFullCenterImages(content) {
    // Regex pour capturer les images avec 'full-center' dans les classes
    const fullCenterImageRegex = /!\[\]\(([^)]+)\s+'([^']*\bfull-center\b[^']*)'\)/g;
    return content.replace(fullCenterImageRegex, (_, src, classes) => {
        // Enlever 'full-center' des classes
        const cleanedClasses = classes
            .split(/\s+/)
            .filter((cls) => cls !== 'full-center')
            .join(' ')
            .trim();
        // Construire la nouvelle image
        let newImage;
        if (cleanedClasses) {
            newImage = `![](${src} '${cleanedClasses}')`;
        }
        else {
            newImage = `![](${src})`;
        }
        // Ajouter le commentaire avec la classe full-center
        return `${newImage} \n<!-- .element: class="full-center" -->`;
    });
}
function migrateFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        const originalContent = content;
        const extension = path.extname(filePath);
        console.log(`Migrating file :  ${filePath} with extension ${extension}`);
        if (extension === '.md') {
            content = migrateSpeakerSlides(content); // Avant les autres règles
            content = migrateMultiColumnSlides(content);
            content = applyRules(content, V3_TO_V4_RULES.MARKDOWN);
            content = processFullCenterImages(content);
        }
        else if (extension === '.html') {
            content = applyRules(content, V3_TO_V4_RULES.HTML);
        }
        else if (extension === '.js') {
            console.log('try to migrate file JS : ', filePath);
            content = applyRules(content, V3_TO_V4_RULES.JAVASCRIPT);
        }
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Successfully migrated: ${filePath}`);
        }
    }
    catch (error) {
        console.error(`Error migrating file ${filePath}:`, error);
    }
}
function findFiles(dir, filter) {
    let results = [];
    const list = fs.readdirSync(dir);
    list.forEach(function (file) {
        const fullPath = path.join(dir, file);
        if (path.basename(fullPath) === 'web_modules' ||
            path.basename(fullPath) === 'node_modules') {
            return; // Skip web_modules directory
        }
        const stat = fs.statSync(fullPath);
        if (stat && stat.isDirectory()) {
            results = results.concat(findFiles(fullPath, filter));
        }
        else {
            if (filter.test(fullPath)) {
                results.push(fullPath);
            }
        }
    });
    return results;
}
function main() {
    const currentDir = process.cwd();
    let docsPath;
    // Vérifier si on est dans le dossier docs ou dans la racine du projet
    if (path.basename(currentDir) === 'docs') {
        // Cas 2: le script est dans docs/, on traite le dossier courant
        docsPath = currentDir;
        console.log(`Script detected in docs directory. Starting migration in: ${docsPath}`);
    }
    else {
        // Cas 1: le script est à la racine, on cherche le dossier docs/
        docsPath = path.join(currentDir, 'docs');
        console.log(`Script detected in project root. Starting migration in: ${docsPath}`);
    }
    // Vérifier que le dossier docs existe
    if (!fs.existsSync(docsPath)) {
        console.error(`Error: docs directory not found at ${docsPath}`);
        return;
    }
    console.log(`Starting migration in: ${docsPath}`);
    const filesToMigrate = findFiles(docsPath, /\.(md|html|js)$/);
    if (filesToMigrate.length === 0) {
        console.log('No relevant files (.md, .html, .js) found in the docs directory.');
        return;
    }
    console.log(`Found ${filesToMigrate.length} files to migrate.`);
    filesToMigrate.forEach(migrateFile);
    console.log('\nMigration complete!');
    console.log('Please review the changes carefully.');
}
main();
