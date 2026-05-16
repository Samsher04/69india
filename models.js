const models = [
  {
    name: "Sophia Luxe",
    username: "@sophia.vip",
    image: "img/1.jpg",
    city: "Delhi",
    category: "Independent",
    badge: "#1 VIP",
    status: "Tonight",
    phone: "919999999999",
  },

  {
    name: "Elena Rose",
    username: "@elena.rose",
    image: "img/2.jpg",
    city: "Mumbai",
    category: "Luxury",
    badge: "#2 HOT",
    status: "Available",
    phone: "919999999998",
  },

  {
    name: "Natasha Queen",
    username: "@natasha.vip",
    image: "img/3.jpg",
    city: "Bangalore",
    category: "VIP Escort",
    badge: "#3 STAR",
    status: "24/7",
    phone: "919999999997",
  },

  {
    name: "Angelina Star",
    username: "@angel.star",
    image: "img/4.jpg",
    city: "Kolkata",
    category: "Party Girl",
    badge: "#4 NEW",
    status: "Tonight",
    phone: "919999999996",
  },

  {
    name: "Kiara Night",
    username: "@kiara.night",
    image: "img/5.jpg",
    city: "Pune",
    category: "Elite",
    badge: "#5 VIP",
    status: "Available",
    phone: "919999999995",
  },

  {
    name: "Ruby Queen",
    username: "@ruby.queen",
    image: "img/6.jpg",
    city: "Hyderabad",
    category: "Independent",
    badge: "#6 HOT",
    status: "Tonight",
    phone: "919999999994",
  },

  {
    name: "Mia Kapoor",
    username: "@mia.kapoor",
    image: "img/7.jpg",
    city: "Chennai",
    category: "Luxury",
    badge: "#7 STAR",
    status: "24/7",
    phone: "919999999993",
  },

  {
    name: "Alina Roy",
    username: "@alina.roy",
    image: "img/8.jpg",
    city: "Goa",
    category: "Party Girl",
    badge: "#8 NEW",
    status: "Available",
    phone: "919999999992",
  },

  {
    name: "Zara Khan",
    username: "@zara.khan",
    image: "img/9.jpg",
    city: "Jaipur",
    category: "VIP Escort",
    badge: "#9 VIP",
    status: "Tonight",
    phone: "919999999991",
  },

  {
    name: "Eva Sharma",
    username: "@eva.sharma",
    image: "img/10.jpg",
    city: "Ahmedabad",
    category: "Elite",
    badge: "#10 HOT",
    status: "Available",
    phone: "919999999990",
  },

  {
    name: "Nina Bella",
    username: "@nina.bella",
    image: "img/11.jpg",
    city: "Surat",
    category: "Luxury",
    badge: "#11 STAR",
    status: "24/7",
    phone: "919999999989",
  },

  {
    name: "Lara Moon",
    username: "@lara.moon",
    image: "img/12.jpg",
    city: "Lucknow",
    category: "Independent",
    badge: "#12 NEW",
    status: "Tonight",
    phone: "919999999988",
  },
];

const container = document.getElementById("models-container");

models.forEach((model) => {

  container.innerHTML += `

    <article
      class="model-card tilt-card reveal"
      onclick="window.location='details.html'"
    >

      <div class="tilt-card-shine"></div>

      <div class="model-card-inner">

        <div style="position: relative">

          <img
            class="model-card-img"
            src="${model.image}"
            alt="${model.name}"
            loading="lazy"
          />

          <div class="model-card-top">

            <span class="model-card-rank">
              ${model.badge}
            </span>

            <span class="model-card-cat">
              ${model.category}
            </span>

          </div>

        </div>

        <div class="model-card-overlay">

          <div class="model-card-name">
            ${model.name}
            <i class="fas fa-check-circle verified-badge"></i>
          </div>

          <div class="model-card-username">
            ${model.username}
          </div>

          <div class="model-card-footer">

            <div class="model-card-stats">

          

              <div class="model-card-stat">
                <i class="fas fa-star"></i>
                VIP
              </div>

              <div class="model-card-stat">
                <i class="fas fa-clock"></i>
                ${model.status}
              </div>

            </div>

            <div
              style="
                display:flex;
                gap:10px;
                align-items:center;
              "
            >

              <!-- CALL BUTTON -->
              <a
                href="tel:+${model.phone}"
                class="like-btn call-btn2"
                onclick="event.stopPropagation()"
              >
                <i class="fas fa-phone"></i>
              </a>

              <!-- WHATSAPP BUTTON -->
              <a
                href="https://wa.me/${model.phone}"
                target="_blank"
                class="like-btn whatsapp-icon"
                onclick="event.stopPropagation()"
              >
                <i class="fab fa-whatsapp"></i>
              </a>

            </div>

          </div>

        </div>

      </div>

    </article>

  `;
});


 const sliderModels = [
    {
      name: "Sophia Luxe",
      city: "Delhi",
      image: "img/1.jpg",
      badge: "🔥 HOT",
      phone: "919999999999",
    },

    {
      name: "Elena Rose",
      city: "Mumbai",
      image: "img/2.jpg",
      badge: "⭐ VIP",
      phone: "919999999998",
    },

    {
      name: "Natasha Queen",
      city: "Bangalore",
      image: "img/3.jpg",
      badge: "🌟 STAR",
      phone: "919999999997",
    },

    {
      name: "Angelina Star",
      city: "Kolkata",
      image: "img/4.jpg",
      badge: "🔥 HOT",
      phone: "919999999996",
    },

    {
      name: "Kiara Night",
      city: "Pune",
      image: "img/5.jpg",
      badge: "⭐ VIP",
      phone: "919999999995",
    },

    {
      name: "Ruby Queen",
      city: "Hyderabad",
      image: "img/6.jpg",
      badge: "🌟 STAR",
      phone: "919999999994",
    },
  ];

  const sliderTrack = document.getElementById("slider-track");

  sliderModels.forEach((model) => {

    sliderTrack.innerHTML += `

      <article class="slider-card">

        <img
          src="${model.image}"
          alt="${model.name}"
          loading="lazy"
        />

        <div class="slider-tag">
          ${model.badge}
        </div>

        <div class="slider-card-overlay">

          <div class="slider-card-name">
            ${model.name}
          </div>

          <div class="slider-card-sub">
            ${model.city} • Available Tonight
          </div>

          <!-- ACTION BUTTONS -->
          <div
            style="
              display:flex;
              gap:10px;
              margin-top:14px;
            "
          >

            <!-- CALL -->
            <a
              href="tel:+${model.phone}"
              class="slider-action-btn call-btn"
            >
              <i class="fas fa-phone"></i>
           
            </a>

            <!-- WHATSAPP -->
            <a
              href="https://wa.me/${model.phone}"
              target="_blank"
              class="slider-action-btn whatsapp-btn"
            >
              <i class="fab fa-whatsapp"></i>
           
            </a>

          </div>

        </div>

      </article>

    `;
  });