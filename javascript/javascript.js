  // ----------------- scroll behavior ----------------------


  // Wait for the DOM to load
  document.addEventListener('DOMContentLoaded', function () {
    // Get all filter buttons
    const filterButtons = document.querySelectorAll('.filter-btn');

    // Get the 'articulos' section
    const articulosSection = document.getElementById('articulos');

    // Add click event listeners to each filter button
    filterButtons.forEach(function (button) {
      button.addEventListener('click', function () {
        // Smoothly scroll to the 'articulos' section
        articulosSection.scrollIntoView({ behavior: 'smooth' });
      });
    });
  });



  ///////////////// busqueda ////////////////////////



  document.addEventListener('DOMContentLoaded', function () {
    const searchInput = document.getElementById('searchInput');
    const suggestionsList = document.getElementById('suggestionsList');
    const noResultsMessage = document.getElementById('noResultsMessage');
    const productTitles = Array.from(document.querySelectorAll('.producto__title'));
    const products = document.querySelectorAll('.product');

    // Ocultar el mensaje de "no se encontraron resultados"
    noResultsMessage.style.display = 'none';

    searchInput.addEventListener('input', function () {
        const query = searchInput.value.toLowerCase();
        suggestionsList.innerHTML = '';
        let hasSuggestions = false;

        // Filtrar productos que coincidan con la búsqueda
        productTitles.forEach((title, index) => {
            const titleText = title.textContent.toLowerCase();
            const product = products[index];

            if (titleText.includes(query) && query !== '') {
                const li = document.createElement('li');
                li.textContent = title.textContent;
                li.addEventListener('click', function () {
                    searchInput.value = title.textContent;
                    suggestionsList.style.display = 'none';
                    showProduct(index);
                });
                suggestionsList.appendChild(li);
                hasSuggestions = true;
                suggestionsList.style.display = 'block';
                noResultsMessage.style.display = 'none';
            }

            // Mostrar u ocultar el producto correspondiente
            if (titleText.includes(query)) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });

        // Si no hay sugerencias, ocultar el menú de sugerencias
        if (!hasSuggestions) {
            suggestionsList.style.display = 'none';
            noResultsMessage.style.display = query !== '' ? 'block' : 'none';
        }
    });

    function showProduct(index) {
        products.forEach((product, idx) => {
            if (idx === index) {
                product.style.display = 'block';
            } else {
                product.style.display = 'none';
            }
        });
    }
});

////////////////// categorias /////////////////////////

// Esperar a que la página se cargue completamente
document.addEventListener("DOMContentLoaded", function() {

    // Obtener todos los botones de filtro y productos
    const filterButtons = document.querySelectorAll('.filter-btn');
    const products = document.querySelectorAll('.product');

    // Función para mostrar los productos filtrados
    function filterProducts(category) {
        // Si la categoría es "all", mostrar todos los productos
        if (category === "all") {
            products.forEach(product => product.style.display = 'block');
        } else {
            // Mostrar u ocultar productos según la categoría seleccionada
            products.forEach(product => {
                product.classList.contains(category) ? 
                product.style.display = 'block' : 
                product.style.display = 'none';
            });
        }
    }

    // Mostrar todas las categorías por defecto al cargar la página
    filterProducts("all");

    // Añadir un event listener a cada botón de filtro
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            // Remover la clase "active" de todos los botones
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Añadir la clase "active" al botón que fue clicado
            this.classList.add('active');

            // Obtener la categoría del botón clicado
            const category = this.getAttribute('data-filter');
            // Filtrar los productos según la categoría
            filterProducts(category);
        });
    });
});


////////////////////// WHATSAPP //////////////////////////


document.addEventListener('DOMContentLoaded', function() {
    // Seleccionar todos los botones con la clase .product__cta
    const consultarBtns = document.querySelectorAll('.product__cta');

    // Iterar sobre cada botón
    consultarBtns.forEach(function(btn) {
        btn.addEventListener('click', function() {
            // Buscar el título del producto más cercano a cada botón
            const productTitle = btn.closest('.product').querySelector('.producto__title').innerText;

            // Número de WhatsApp (reemplazar por tu número)
            const whatsappNumber = '543815411429';

            // Mensaje predefinido
            const mensaje = `Hola, quiero saber si me puede enviar más información sobre ${productTitle}`;
            

            // Enlace a WhatsApp
            const whatsappLink = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(mensaje)}`;

            // Abrir WhatsApp en una nueva ventana o pestaña
            window.open(whatsappLink, '_blank');
        });
    });
});







// ---------------------------- CARGAR MAS -----------------------------------------



document.addEventListener("DOMContentLoaded", function () {
  const products = document.querySelectorAll('.products .product');
  const loadMoreButton = document.getElementById('loadMoreAll');
  let itemsToShow = 20; // Número inicial de productos a mostrar
  let totalItems = products.length;

  // Función para mostrar productos según el número a mostrar
  function showItems(count) {
      products.forEach((product, index) => {
          if (index < count) {
              product.style.display = 'block';
          } else {
              product.style.display = 'none';
          }
      });
  }

  // Mostrar los primeros 10 artículos al cargar la página
  showItems(itemsToShow);

  // Si hay más de 10 productos, muestra el botón "Cargar más"
  if (totalItems > itemsToShow) {
      loadMoreButton.style.display = 'block';
  }

  // Evento para cargar más productos al hacer clic
  loadMoreButton.addEventListener('click', function () {
      itemsToShow += 10; // Incrementa el número de productos a mostrar
      showItems(itemsToShow);

      // Ocultar el botón si ya se muestran todos los productos
      if (itemsToShow >= totalItems) {
          loadMoreButton.style.display = 'none';
      }
  });
});
