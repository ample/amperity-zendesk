/*!
 * @preserve
 * Theme Name: Diziana Sagma Theme (3.4.22)
 * @Version: 3.4.22
 * Version: 3.4.22
 * Author: Diziana (Allies Interactive Services Private Limited)
 * Website: https://www.diziana.com
 * Corporate Website : https://www.alliesinteractive.com/
 * Support: support@diziana.com
 * Follow: https://www.twitter.com/dizianaEngage
 * Like: https://www.facebook.com/diziana.engage
 * Purchased From: https://www.diziana.com
 * @link https://www.diziana.com"
 * @license A valid license is required to legally use this software (theme/plugin). You can purchase from diziana.com.
 * @copyright: © 2024 Allies Interactive Services Private Limited. All Rights Reserved
 */

document.addEventListener("DOMContentLoaded", function () {
  // Category Sidebar
  function addSidebarMenu() {
    if (dzUtils.isCSATemplates()) {
      initMultiLevelMenu({
        htmlClass: "diziana-category-sidebar-menu",
        storageType: "session",
      });
      var mCount = 0;
      dzUtils.queueExecution(function (c) {
        var menu = document.querySelector(".diziana-category-sidebar-menu");
        var li =
          menu &&
          menu.querySelector(
            "li.category-" + (dzUtils.getCategoryId() || categoryId)
          );
        mCount++;
        if (li) {
          li && dzUtils.addClass(li, "active");
        }
        if (mCount >= 20) {
          c();
        }
      });
    }
  }

  //Search bar placeholder text
  function setSearchPlaceholderText() {
    var searchPlaceholderText = document.querySelector(
      "span#search_placeholder_template"
    );
    if (searchPlaceholderText) {
      var value = searchPlaceholderText.getAttribute("data-value");
      var searchField = document.querySelector("#query");
      searchField && value && searchField.setAttribute("placeholder", value);
    }
  }

  /**
   * Returns URL of image
   *
   **/

  function getAssetURLById(id) {
    var blockIcon = window["assets" + id];
    if (blockIcon) {
      return { blockIcon: blockIcon };
    }
    var block = document.querySelector(".block-icon-" + id);
    var svgIcon = block && block.getAttribute("data-svg-url");
    var pngIcon = block && block.getAttribute("data-png-url");
    var jpgIcon = block && block.getAttribute("data-jpg-url");
    var icon = jpgIcon || pngIcon || svgIcon;
    icon = icon && icon !== "" ? icon : null;
    return { blockIcon: icon };
  }

  function toggleBlockImageAttributes(id) {
    var item = document.querySelector(
      '.blocks-item[data-item-id="' + id + '"]'
    );
    if (item) {
      item.setAttribute("data-has-default-image", "false");
    }
  }

  /**
   * sets the image url from assets id
   *
   **/
  function setIcon(id) {
    var icon = getAssetURLById(id);
    if (icon && icon["blockIcon"]) {
      var blockIcon = document.querySelector(".block-icon-" + id);
      var blockFontIcon = document.querySelector(".block-font-icon-" + id);
      var hasFontIcon = icon.blockIcon.indexOf("fa") === 0;
      var target = hasFontIcon ? blockFontIcon : blockIcon;
      var tobeHidden = hasFontIcon ? blockIcon : blockFontIcon;
      if (target) {
        if (hasFontIcon) {
          var icnClass = [icon.blockIcon.split(" ")];
          var fas = icnClass[0][0];
          var pen = icnClass[0][1];
          target.classList.add(fas);
          target.classList.add(pen);
          // dzUtils.addClass(target, icon.blockIcon);
        } else {
          target.setAttribute("src", icon.blockIcon);
        }
        dzUtils.removeClass(target, "hide");
        dzUtils.show(target.parentNode);
        dzUtils.hide(tobeHidden);
        toggleBlockImageAttributes(id);
      }
    }
  }

  // Show category block icons function
  function showIcons() {
    var blocks = dzUtils.querySelectorAll(".blocks-item[data-item-id]");
    blocks.forEach(function (block) {
      var id = block.getAttribute("data-item-id");
      setIcon(id);
    });
  }

  // Homepage Accordion format code for KB Tree
  function enableAccordionForKBTree() {
    if (
      dzUtils.isHomePageTemplate() &&
      dzThemeSettings.kbTreeEnabled &&
      dzThemeSettings.kbTreeAccordionEnabled
    ) {
      var treeContainer = document.querySelector(".tree-container");
      treeContainer && dzUtils.addClass(treeContainer, "accordion");
      dzUtils.querySelectorAll(".tree-item-title").forEach(function (el) {
        var iconsWrapper = el.querySelector(".tree-item-link .icons-wrapper");
        iconsWrapper && dzUtils.removeClass(iconsWrapper, "hide");
        var link = el.querySelector(".tree-item-link");
        link &&
          link.addEventListener("click", function (e) {
            e.preventDefault();
            link.classList.toggle("active");
            var nextSiblings = dzUtils.getNextElementSiblings(el);
            var filteredSiblings = nextSiblings.filter(function (t) {
              return dzUtils.hasClass(t, "section-tree-list");
            });

            if (filteredSiblings.length >= 1) {
              domSlider.slideToggle({
                element: filteredSiblings[0],
                delay: 100,
              });
            }
          });
      });
    }
  }

  // Adds Table of Content to Article if it finds <!--TOC--> in article source
  // Depends on toc plugin
  function attachArticleTOC() {
    if (dzUtils.isArticleTemplate()) {
      let tocEl = document.querySelector("#toc");
      if (tocEl) {
        dzUtils.generateArticleTOC("#toc", ".article-body", "h1,h2,h3,h4");

        if (tocEl.children.length) {
          dzUtils.show(document.querySelector("#article-toc"));
        } else {
          var articleToc = document.querySelector("#article-toc");

          return articleToc.parentNode.removeChild(articleToc);
        }
        dzUtils.enableSmoothScrollingToID();
      }
    }
  }

  //make tables responsive
  function wrapElements() {
    if (dzUtils.isArticleTemplate()) {
      dzUtils.wrapElements(
        ".article-body table",
        "<div class='table-responsive'> </div>"
      );


        var relativesarticle = document.querySelector(".article-relatives");
        var artrelativeLength = document.querySelector(".article-relatives").childElementCount;
        if (!artrelativeLength) {
          relativesarticle.classList.add("hide");
      }
    }
  }

  // hide the div when empty
  function showHideSocialHandles() {
    var socialShare = document.querySelector("ul.share");
    var shareLinks = socialShare.childElementCount;
    if (!shareLinks && !shareLinks.length) {
      socialShare && socialShare.parentNode.classList.add("hide");
    }
  }

  // Dynamic year of copyright
  function setCopyrightYear() {
    var year = new Date().getFullYear();
    var yearEl = document.querySelector("#year");
    if(yearEl){
    yearEl & (yearEl.innerHTML = year);
    }
  }

  // Hide submit button of Searchbar
  function hideSearchButton() {
    if (dzThemeSettings.hideSearchButton) {
      var search = document.querySelector(".search.search-full");
      if (search) {
        dzUtils.addClass(search, "show_button");
      }
    }
  }

  // Script to check the size of search sidebar children
  function searchTemplateSidebar() {
    if (dzUtils.isSearchResultsTemplate()) {
      if(dzThemeSettings.searchPageSidebar){
      var full = document.querySelector(".search-results-sidebar")
        .childElementCount;
      var searchSidebar = document.querySelector(".search-results-sidebar");
      if (!full) {
        searchSidebar.classList.add("hide");
      }
     }
    }
  }

  // Script to check the size of article in section sidebar children
  function articleTemplateSidebar() {
    if (dzUtils.isArticleTemplate()) {
      if(dzThemeSettings.sectionArticleSidebar){
      var fullArt = document.querySelector(".section-articles ul")
        .childElementCount;
      var childArt = document.querySelector(".article-sidebar");

      if (!fullArt) {
        childArt.classList.add("hide");
      }
     }
    }
  }

  function promotedArticleList() {
    // Show see-more link for promoted articles
    if (templateName === "homepage") {
      var promotedArticlesLength = document.querySelector(
        ".article-list.promoted-articles"
      );
      var promotedArticles = document.querySelector(".promoted-articles-item");
      var seeMoreButton = document.querySelector(".see-more");
      if (promotedArticles >= 5) {
        seeMoreButton.classList.remove("hide");
      }
      var seeMoreLink = document.querySelector(".see-more");
      if (promotedArticles) {
        seeMoreLink.addEventListener("click", function (e) {
          e.preventDefault();
          seeMoreLink.classList.add("hide");
          var e;
          (e = document.querySelectorAll(".promoted-articles-item")).forEach(
            function (e) {
              e.classList.add("show");
            }
          );
        });
      }
    }
  }

  function updateStatusIndicator(status) {
    var statusIndicator = document.getElementById('status-indicator');
    switch(status) {
      case 'none':
        statusIndicator.style.backgroundColor = '#A4E298';
        break;
      case 'minor':
        statusIndicator.style.backgroundColor = 'yellow';
        break;
      case 'major':
        statusIndicator.style.backgroundColor = 'orange';
        break;
      case 'critical':
        statusIndicator.style.backgroundColor = 'red';
        break;
      default:
        statusIndicator.style.backgroundColor = 'light-gray';
        break;
    }
  }

  function showAmperityStatus() {
    // Dynamically load the external script
    fetch('https://8pzryzgrzwth.statuspage.io/api/v2/status.json')
    .then(response => response.json())
    .then(data => {
      // Update the status indicator based on the fetched status
      if (data && data.status && data.status.indicator) {
        updateStatusIndicator(data.status.indicator);
      }
    })
    .catch(error => console.error('Error fetching status:', error));
  }

  function swifttypeRender() {
    var searchInput = document.querySelector('#query');
    if (searchInput) {
      searchInput.classList.add('st-default-search-input');
    }
  }

  swifttypeRender();
  showAmperityStatus();
  hideSearchButton();
  showIcons();
  enableAccordionForKBTree();
  promotedArticleList();
  addSidebarMenu();
  setSearchPlaceholderText();
  articleTemplateSidebar();
  wrapElements();
  searchTemplateSidebar();
  attachArticleTOC();
  showHideSocialHandles();
  setCopyrightYear();
});
