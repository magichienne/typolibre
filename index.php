<?php
// $pageCSS = "css/home.css";
// $pageScript = "scripts/home.js";

$pageTitle = "typolibres";
// (titre par défault : "spirale press")

include 'php_includes/head.php';
?>

<body>

  <main>
    <div id="div1">
      <div id="title-buttons">
        <h1><a href="">typolibres</a></h1>
        <button id="accessible">mode accessible</button>
      </div>
      <div id="presentation" class="paragraphe">
        <h2>
          une liste de ressources de typographies libres &--ou gratuites, et autres ressources gratuites en ligne, pour mes amies et toutes les personnes à qui ça&nbsp;servira.
        </h2>
        <p>par défaut, les entrées sont affichées par ordre d'ajout. vous pouvez cliquer sur les en-têtes du tableau pour trier les entrées par ordre alphabétique<span class="mobile-hidden">, et sur les tags pour filtrer les entrées</span>.</p>
      </div>
    </div>

    <?php
    // Load the JSON data from the file
    $jsonData = file_get_contents('rows.json');

    // Decode the JSON into a PHP array
    $rows = json_decode($jsonData, true);

    // Function to generate HTML for each row
    function generateRowHTML($row)
    {
      return "
    <tr>
        <td class='name'><p>" . htmlspecialchars($row['name']) . "</p></td>
        <td class='type'><p>" . htmlspecialchars($row['type']) . "</p></td>
        <td class='tag-cell' data-tags='" . implode(', ', $row['tags']) . "'>
            " . implode('', array_map(fn($tag) => "<p class='tag'>" . htmlspecialchars($tag) . "</p>", $row['tags'])) . "
        </td>
        <td><p class='license-cell'>" . htmlspecialchars($row['licenses']) . "</p></td>
        <td>" . implode('', array_map(fn($link) => "<p class='link-cell'><a href='" . htmlspecialchars($link[0]) . "' class='table-link' target='_blank'>" . htmlspecialchars($link[1]) . "</a></p>", $row['links'])) . "</td>
    </tr>";
    }
    ?>

    <div class=" tableau" id="div2">
      <table id="type-table">
        <thead>
          <tr>
            <th data-sort="name" class="sortable">
              <span class="sorting-letter">a</span>
              nom
            </th>
            <th data-sort="type" class="sortable">
              <span class="sorting-letter">a</span>
              type
            </th>
            <th id="tag-head">
              <span id="delete-filter">x</span>
              tags
            </th>
            <th data-sort="licenses" class="sortable">
              <span class="sorting-letter">a</span>
              licences
            </th>
            <th>lien•s</th>
          </tr>
        </thead>

        <tbody>
          <!-- Dynamically generated rows -->
          <?php
          foreach ($rows as $row) {
            echo generateRowHTML($row);
          }
          ?>
        </tbody>
      </table>
    </div>


    <div id="div3">
      <div class="text3 paragraphe">
        <p>
          si vous souhaitez <span class="special">contribuer</span> à cette liste, ou que vous avez des <span class="special">suggestions d'amélioration</span> concernant le <span class="special">mode accessible</span>, vous pouvez m'envoyer un&nbsp;<a href="mailto:hello@typolibres.joanajost.fr" target="_blank">mail</a> !
        </p>
        <p>
          fontes utilisées : <a href="https://www.dafont.com/alte-haas-grotesk.font" target="_blank">alte&nbsp;haas&nbsp;grotesk</a> par&nbsp;Yann le Coroller,<a href="https://www.redaction.us/" target="_blank">redaction</a> par Forest Young et&nbsp;Jeremy Mickel
        </p>
        <p>
          le code de ce site est open-source et disponible sur <a href="https://github.com/magichienne/typolibre" target="_blank">github</a>. developpé et curaté depuis 2025 par&nbsp;<a href="https://joanajost.fr/" target="_blank">jjj</a>
        </p>
      </div>
    </div>

  </main>

  <script src="scripts/script.js"></script>
  <script src="scripts/accessibility.js"></script>
</body>

</html>