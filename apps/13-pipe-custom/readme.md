# Exercice 13-pipe-custom (apps steps/13-pipe-custom)

L'objectif de ce workshop est de créer votre propre pipe

<br>

## Etape 1

Dans le dossier **shared** créez un dossier **pipes**

## Etape 1

A l'aide du CLI, dans le dossier **pipes**, créez un pipe **NaPipe** et pensez à l'enregistrer dans le module **Shared**
<br<br

## Etape 2

Analysez le contenu du fichier **na.pipe.ts**
<br><br>

## Etape 3

La fonction **transform** doit retourner **"N/A"** si la valeur passée en paramètre n'est pas définie, ce qui signifie que le nom du manager n'est pas défini
<br><br>

## Etape 4

Appelez votre pipe **na** sur la propriété **person.manager**. 
Si cette personne n'a pas de manager vous devriez apercevoir la valeur **NA** au lieu d'un string vide
<br><br>

## Etape 5

Vérifier votre travail en vous plaçant à la racine du dossier TP et en lançant la commande:

```bash
npm run client -- 13-pipe-custom
```
