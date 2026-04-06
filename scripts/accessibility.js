document.addEventListener("DOMContentLoaded", function () {
    const btn = document.getElementById("accessible");
    const stylesheet = document.getElementById("theme-stylesheet");

    const normalCSS = "css/stylesheet.css";
    const accessibleCSS = "css/accessibility.css";

    // Debug: Check if stylesheet element exists
    if (!stylesheet) {
        console.error("Stylesheet link with id 'theme-stylesheet' not found.");
        return;
    }

    console.log("Current stylesheet path:", stylesheet.href);
    console.log("Expected paths:", normalCSS, accessibleCSS);

    // Function to update button text
    function updateButtonText() {
        if (stylesheet.href.includes("accessibility.css")) {
            btn.textContent = "mode couleur"; // In accessibility mode
        } else {
            btn.textContent = "mode accessible"; // In normal mode
        }
        console.log("Button text updated to:", btn.textContent);
    }

    // Check saved preference in localStorage
    const savedTheme = localStorage.getItem("theme");
    console.log("Saved theme in localStorage:", savedTheme);

    if (savedTheme === "accessible") {
        stylesheet.href = accessibleCSS;
        console.log("Applying accessibility mode:", accessibleCSS);
    } else {
        console.log("Applying normal mode:", normalCSS);
    }

    updateButtonText(); // Set correct button text on load

    btn.addEventListener("click", function () {
        if (stylesheet.href.includes("stylesheet.css")) {
            stylesheet.href = accessibleCSS;
            localStorage.setItem("theme", "accessible");
            console.log("Switched to accessibility mode:", accessibleCSS);
        } else {
            stylesheet.href = normalCSS;
            localStorage.setItem("theme", "normal");
            console.log("Switched to normal mode:", normalCSS);
        }
        updateButtonText();
    });
});
