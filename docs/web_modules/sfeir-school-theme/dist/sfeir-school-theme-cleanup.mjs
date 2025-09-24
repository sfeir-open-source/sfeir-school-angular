#!/usr/bin/env node
/* eslint-disable @typescript-eslint/no-explicit-any */
import fs from 'fs';
import path from 'path';
// #region Règles de nettoyage
const CLEANUP_RULES = {
    MARKDOWN: [
        {
            from: /<!-- \.slide:\s*-->/g,
            to: '',
        },
        {
            from: /<!-- \.slide: class="([^"]*)"/g,
            to: (match, classString) => {
                if (classString.includes('transition') &&
                    classString.includes('underline')) {
                    const newClassString = classString
                        .replace(/\bunderline\b/g, '')
                        .replace(/\s\s+/g, ' ')
                        .trim();
                    return `<!-- .slide: class="${newClassString}"`;
                }
                return match; // return the original match if conditions are not met
            },
        },
        {
            from: /class="([^"]*)"/g,
            to: (match, classString) => {
                if (classString.includes('bg-pink')) {
                    const newClassString = classString
                        .replace(/\bbg-pink\b/g, '')
                        .replace(/\s\s+/g, ' ')
                        .trim();
                    return `class="${newClassString}"`;
                }
                return match; // return the original match if conditions are not met
            },
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
function cleanupFile(filePath) {
    try {
        let content = fs.readFileSync(filePath, 'utf-8');
        const originalContent = content;
        content = applyRules(content, CLEANUP_RULES.MARKDOWN);
        if (content !== originalContent) {
            fs.writeFileSync(filePath, content, 'utf-8');
            console.log(`Successfully cleaned up: ${filePath}`);
        }
    }
    catch (error) {
        console.error(`Error cleaning up file ${filePath}:`, error);
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
    console.log(`Starting cleanup in: ${docsPath}`);
    const filesToCleanup = findFiles(docsPath, /\.md$/);
    if (filesToCleanup.length === 0) {
        console.log('No markdown files found in the docs directory.');
        return;
    }
    console.log(`Found ${filesToCleanup.length} files to clean up.`);
    filesToCleanup.forEach(cleanupFile);
    console.log('\nCleanup complete!');
    console.log('Please review the changes carefully.');
}
main();
