document.addEventListener("DOMContentLoaded", function () {
    const table = document.getElementById("type-table");
    const headers = table.querySelectorAll("th");
    const deleteFilterButton = document.getElementById("delete-filter");
    const tags = document.querySelectorAll(".tag");
    let sortOrder = {};
    let activeFilters = new Set();

    function normalizeText(text) {
        return text
            .normalize("NFD")
            .replace(/[\u0300-\u036f]/g, "")
            .toLowerCase()
            .replace(/\s+/g, " ")
            .trim();
    }

    headers.forEach(header => {
        const sortingLetter = header.querySelector('.sorting-letter');
        if (sortingLetter) {
            sortingLetter.style.display = "none";
        }
    });

    headers.forEach((header, index) => {
        if (index === 0 || index === 1 || index === 3) {
            sortOrder[index] = 1;

            header.addEventListener("click", function () {
                sortTable(index, sortOrder[index]);
                sortOrder[index] *= -1;
                updateHeader(index, sortOrder[index]);
            });
        }
    });

    deleteFilterButton.style.display = "none";

    tags.forEach(tag => {
        tag.addEventListener("click", function () {
            const tagText = normalizeText(tag.textContent.trim());
            const isTicked = tag.classList.contains("ticked");

            if (isTicked) {
                activeFilters.delete(tagText);
                document.querySelectorAll(".tag").forEach(identicalTag => {
                    if (normalizeText(identicalTag.textContent.trim()) === tagText) {
                        identicalTag.classList.remove("ticked");
                    }
                });
            } else {
                activeFilters.add(tagText);
                document.querySelectorAll(".tag").forEach(identicalTag => {
                    if (normalizeText(identicalTag.textContent.trim()) === tagText) {
                        identicalTag.classList.add("ticked");
                    }
                });
            }

            toggleDeleteFilterButton();
            filterRows();
        });
    });

    deleteFilterButton.addEventListener("click", function () {
        activeFilters.clear();
        tags.forEach(tag => tag.classList.remove("ticked"));
        toggleDeleteFilterButton();
        filterRows();
    });

    function toggleDeleteFilterButton() {
        deleteFilterButton.style.display = activeFilters.size > 0 ? "inline" : "none";
    }

    function sortTable(colIndex, order) {
        const tbody = table.querySelector("tbody");
        const rows = Array.from(tbody.querySelectorAll("tr"));

        rows.sort((rowA, rowB) => {
            let cellA = normalizeText(rowA.cells[colIndex].textContent);
            let cellB = normalizeText(rowB.cells[colIndex].textContent);
            return cellA.localeCompare(cellB) * order;
        });

        tbody.append(...rows);
    }

    function updateHeader(sortedIndex, order) {
        headers.forEach((header, index) => {
            const sortingLetter = header.querySelector('.sorting-letter');
            if (sortingLetter) {
                sortingLetter.style.display = "none";
            }
            if (index === sortedIndex && sortingLetter) {
                sortingLetter.style.display = "inline";
                sortingLetter.textContent = (order === 1 ? "z" : "a");
            }
        });
    }

    function filterRows() {
        const rows = table.querySelectorAll("tbody tr");

        rows.forEach(row => {
            const tagCell = row.querySelector("td[data-tags]");
            const tagsInRow = tagCell ? tagCell.getAttribute("data-tags").split(',').map(tag => normalizeText(tag.trim())) : [];
            const tagsMatch = activeFilters.size === 0 || [...activeFilters].every(filterTag => tagsInRow.includes(filterTag));
            row.style.display = tagsMatch ? "" : "none";
        });
    }
});





