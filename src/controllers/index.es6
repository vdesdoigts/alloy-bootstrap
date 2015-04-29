class IndexPage {

    constructor() {
        $.index.open();
        $.label.addEventListener('click', () => { this.doClick });
    }

    doClick() {
        return alert($.label.text);
    }
}
var page = new IndexPage();


