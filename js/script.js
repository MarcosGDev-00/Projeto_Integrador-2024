document.addEventListener('DOMContentLoaded', function () {
  const startReadingButton = document.getElementById('start-reading');
  const stopReadingButton = document.getElementById('stop-reading');
  const restartReadingButton = document.getElementById('restart-reading');
  const textToRead = document.getElementById('text-to-read').innerText;

  let utterance = new SpeechSynthesisUtterance(textToRead);

  startReadingButton.addEventListener('click', () => {
    speechSynthesis.speak(utterance);
    startReadingButton.style.display = 'none';
    stopReadingButton.style.display = 'inline';
    restartReadingButton.style.display = 'inline';
  });

  stopReadingButton.addEventListener('click', () => {
    speechSynthesis.cancel();
    startReadingButton.style.display = 'inline';
    stopReadingButton.style.display = 'none';
    restartReadingButton.style.display = 'none';
  });

  restartReadingButton.addEventListener('click', () => {
    speechSynthesis.cancel();
    speechSynthesis.speak(utterance);
  });

  utterance.onend = () => {
    startReadingButton.style.display = 'inline';
    stopReadingButton.style.display = 'none';
    restartReadingButton.style.display = 'none';
  };

  const toggleDarkModeButton = document.getElementById('toggle-dark-mode');

  toggleDarkModeButton.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
  });

  // let next = document.querySelector('.next');
  // let prev = document.querySelector('.prev');

  // next.addEventListener('click', function () {
  //   let items = document.querySelectorAll('.item');
  //   document.querySelector('.slide').appendChild(items[0]);
  // });

  // prev.addEventListener('click', function () {
  //   let items = document.querySelectorAll('.item');
  //   document.querySelector('.slide').prepend(items[items.length - 1]); // here the length of items = 6
  // });

  let nextBtn = document.querySelector('.next');
  let prevBtn = document.querySelector('.prev');

  let slider = document.querySelector('.slider');
  let sliderList = slider.querySelector('.slider .list');
  let thumbnail = document.querySelector('.slider .thumbnail');
  let thumbnailItems = thumbnail.querySelectorAll('.item');

  thumbnail.appendChild(thumbnailItems[0]);

  // Function for next button
  nextBtn.onclick = function () {
    moveSlider('next');
  };

  // Function for prev button
  prevBtn.onclick = function () {
    moveSlider('prev');
  };

  function moveSlider(direction) {
    let sliderItems = sliderList.querySelectorAll('.item');
    let thumbnailItems = document.querySelectorAll('.thumbnail .item');

    if (direction === 'next') {
      sliderList.appendChild(sliderItems[0]);
      thumbnail.appendChild(thumbnailItems[0]);
      slider.classList.add('next');
    } else {
      sliderList.prepend(sliderItems[sliderItems.length - 1]);
      thumbnail.prepend(thumbnailItems[thumbnailItems.length - 1]);
      slider.classList.add('prev');
    }

    slider.addEventListener(
      'animationend',
      function () {
        if (direction === 'next') {
          slider.classList.remove('next');
        } else {
          slider.classList.remove('prev');
        }
      },
      { once: true },
    ); // Remove the event listener after it's triggered once
  }

  // Função para o acordeão
  function toggleAccordion(element) {
    var item = element.parentNode;
    var body = item.querySelector('.accordion-item-body');
    var isOpen = item.classList.toggle('open');

    if (isOpen) {
      body.style.height = body.scrollHeight + 'px';
    } else {
      body.style.height = '0';
    }
  }

  var accordionItems = document.querySelectorAll('.accordion-item-header');
  accordionItems.forEach(function (header) {
    header.addEventListener('click', function () {
      toggleAccordion(this);
    });
  });

  // Inicialização dos passos
  function initializeSteps() {
    var steps = document.querySelectorAll('.step');
    var stepActions = [
      { className: 'step01', progressWidth: '3%', activeClass: 'discovery' },
      { className: 'step02', progressWidth: '25%', activeClass: 'strategy' },
      { className: 'step03', progressWidth: '50%', activeClass: 'creative' },
      { className: 'step04', progressWidth: '75%', activeClass: 'production' },
      { className: 'step05', progressWidth: '100%', activeClass: 'analysis' },
    ];

    steps.forEach(function (step) {
      step.addEventListener('click', function () {
        this.classList.add('active');
        var prevElements = getPrevSiblings(this);
        var nextElements = getNextSiblings(this);

        prevElements.forEach(function (el) {
          el.classList.add('active');
        });

        nextElements.forEach(function (el) {
          el.classList.remove('active');
        });
      });
    });

    stepActions.forEach(function (action) {
      var step = document.querySelector('.' + action.className);
      if (step) {
        step.addEventListener('click', function () {
          document.getElementById('line-progress').style.width =
            action.progressWidth;
          var activeElement = document.querySelector('.' + action.activeClass);
          if (activeElement) {
            activeElement.classList.add('active');
            var siblings = getSiblings(activeElement);
            siblings.forEach(function (sibling) {
              sibling.classList.remove('active');
            });
          }
        });
      }
    });
  }

  function getPrevSiblings(elem) {
    var siblings = [];
    while ((elem = elem.previousElementSibling)) {
      siblings.push(elem);
    }
    return siblings;
  }

  function getNextSiblings(elem) {
    var siblings = [];
    while ((elem = elem.nextElementSibling)) {
      siblings.push(elem);
    }
    return siblings;
  }

  function getSiblings(elem) {
    var siblings = [];
    var sibling = elem.parentNode.firstChild;
    for (; sibling; sibling = sibling.nextSibling) {
      if (sibling.nodeType === 1 && sibling !== elem) {
        siblings.push(sibling);
      }
    }
    return siblings;
  }

  initializeSteps();

  var swiper = new Swiper('.slide-content', {
    slidesPerView: 3,
    spaceBetween: 25,
    loop: true,
    centerSlide: 'true',
    fade: 'true',
    grabCursor: 'true',
    pagination: {
      el: '.swiper-pagination',
      clickable: true,
      dynamicBullets: true,
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev',
    },
    breakpoints: {
      0: {
        slidesPerView: 1,
      },
      768: {
        slidesPerView: 2,
      },
      1024: {
        slidesPerView: 3,
      },
    },
  });

  // document
  //   .getElementById('contactForm')
  //   .addEventListener('submit', function (event) {
  //     event.preventDefault();

  //     const formData = {
  //       name: document.getElementById('name').value,
  //       email: document.getElementById('email').value,
  //       message: document.getElementById('message').value,
  //     };

  //     fetch('http://localhost:3000/send-email', {
  //       method: 'POST',
  //       headers: {
  //         'Content-Type': 'application/json',
  //       },
  //       body: JSON.stringify(formData),
  //     })
  //       .then((response) => response.text())
  //       .then((data) => {
  //         alert(data);
  //       })
  //       .catch((error) => {
  //         console.error('Erro:', error);
  //         alert('Ocorreu um erro ao enviar o email.');
  //       });
  //   });

  // function initMap() {
  //   var location = { lat: -23.55052, lng: -46.633308 }; // Coordenadas de São Paulo, Brasil
  //   var map = new google.maps.Map(document.getElementById('map'), {
  //     zoom: 12,
  //     center: location,
  //   });
  //   var marker = new google.maps.Marker({
  //     position: location,
  //     map: map,
  //   });
  // }

  document.querySelectorAll('a.link').forEach((anchor) => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      document.querySelector(this.getAttribute('href')).scrollIntoView({
        behavior: 'smooth',
      });
    });
  });

  var header = document.querySelector('.head_fixo');
  var sticky = header.offsetTop;

  window.onscroll = function () {
    if (window.pageYOffset > sticky) {
      header.classList.add('fixed');
    } else {
      header.classList.remove('fixed');
    }

    var backToTopButton = document.getElementById('backToTop');
    if (
      document.body.scrollTop > 20 ||
      document.documentElement.scrollTop > 20
    ) {
      backToTopButton.style.display = 'block';
    } else {
      backToTopButton.style.display = 'none';
    }
  };

  document.getElementById('backToTop').addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  });

  const mobileMenuToggle = document.getElementById('mobile-menu-toggle');
  const mobileMenu = document.querySelector('.mobile-menu');

  mobileMenuToggle.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    if (mobileMenu.classList.contains('open')) {
      mobileMenuToggle.innerHTML = '<i class="fas fa-times"></i>';
    } else {
      mobileMenuToggle.innerHTML = '<i class="fas fa-bars"></i>';
    }
  });

  var swiper = new Swiper(".swiper-container", {
    effect: "cube",
    grabCursor: true,
    cubeEffect: {
      shadow: true,
      slideShadows: true,
      shadowOffset: 20,
      shadowScale: 0.94,
    }
  });
});
