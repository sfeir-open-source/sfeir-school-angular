<!-- .slide: class="sfeir-basic-slide" -->
# Webpack
Sous le capot, Angular utilise webpack pour builder notre application
<div class="flex-row">
    <div>
        Qu'est ce que WebPack ?
        <br><br>
        <ul>
            <li>Bundle en Javascript</li><br>
            <li>Hot Reload / webpack-dev-server</li><br>
            <li>Actuellement le choix par défaut d'Angular</li>
        </ul>
        <div>
            <img alt="h-300" src="assets/images/school/architecture/webpack_logo.png" />
        </div>
    </div>
    <img alt="h-800" src="assets/images/school/architecture/build_exemple.png" />
    
</div>
Notes:
- Angular version 9 apporte son lot de nouveauté avec Ivy nouveau renderer et Bazel pour un build plus léger
- Attention Bazel ne remplacera pas webpack, mais webpack utilisera bazel
