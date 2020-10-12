const template = document.createElement("template");

template.innerHTML = `

    <style>
        *, *::before, *::after {
          box-sizing: border-box;
        }
        .container {
            display: inline-block;
            position: relative;
            z-index: 5;
        }

        slot {
          cursor: pointer;
        }

        .glossary-container {
            color: #666666;
            width: 300px;
            font-size: 1rem;
            line-height: 1.25rem;
            text-align: left;
            padding: 1.1em;
            border-radius: 0.55em;
            background-color: rgba(255, 255, 255, 1);
            box-shadow: 5px 5px 10px 0px rgba(0, 0, 0, 0.4);

            position: absolute;
            bottom: 125%;
            transform: scale(0);
            transform-origin: bottom left;
            transition: transform 0.1s ease-in-out;
            z-index: 10;
        }

        .open-glossary {
            transform: scale(1);
        }

        @supports (-webkit-backdrop-filter: none) or (backdrop-filter: none) {
          .glossary-container {
            -webkit-backdrop-filter: blur(0.55em);
            backdrop-filter: blur(0.55em);
            background-color: rgba(255, 255, 255, 1);
          }
        }

    </style>

    
    <div class="container" >
        <div class="glossary-container" >
        </div>
        <slot />
    </div>
    

`;

class GlossaryPopup extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  openGlossary = (e) => {
    this.shadowRoot
      .querySelector(".glossary-container")
      .classList.add("open-glossary");
  };

  closeGlossary = (e) => {
    if (!this.contains(e.target)) {
      this.shadowRoot
        .querySelector(".glossary-container")
        .classList.remove("open-glossary");
    }
  };

  connectedCallback() {
    const glossaryContainer = this.shadowRoot.querySelector(
      ".glossary-container"
    );
    glossaryContainer.innerHTML = this.getAttribute("content");
    if (Number(window.innerWidth - this.offsetLeft) < 300) {
      glossaryContainer.style["transform-origin"] =
        glossaryContainer.style["transform-origin"].split(" ")[0] + " right";
      glossaryContainer.style["right"] = "0";
    }
    if (
      Number(glossaryContainer.getBoundingClientRect().top) <
      Number(glossaryContainer.offsetHeight)
    ) {
      glossaryContainer.style["transform-origin"] =
        " " + glossaryContainer.style["transform-origin"].split(" ")[1];
      glossaryContainer.style["top"] = "125%";
      glossaryContainer.style["bottom"] = "inherit";
    }

    this.addEventListener("click", this.openGlossary);
    document.addEventListener("click", this.closeGlossary);
  }

  disconnectedCallback() {
    this.removeEventListener("click", this.openGlossary);
    document.removeEventListener("click", this.closeGlossary);
  }
}

window.customElements.define("glossary-popup", GlossaryPopup);
