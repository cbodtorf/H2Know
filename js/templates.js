/*******************************
* TEMPLATES
*
********************************/

module.exports = {
    login:`
        <div class="login">
            <input id="username" type="text" placeholder="username" value="">
            <input id="password" type="password" placeholder="password" value="">
            <button id="login" type="button">Login</button>
        </div>
    `,
    manager: `
        <div class="manager">
            <ul id="plant-list">
                <li>asparagus <span>+</span></li>
            </ul>
        </div>
    `,
    plant: ``,
    header: `
        <h1>H<sub>2</sub></h1><span>&#27700;n<h1>O</h1>w</span>
    `,
    footer: `
      <h5>"dont be a plant murderer"</h5>
      <span>&copy;2016 Black & Bodtorf</span>
    `,
}
