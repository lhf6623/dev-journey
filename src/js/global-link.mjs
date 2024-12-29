import pkg from "../../package.json" with { type: "json" };

const globalLinks = []; // 需要添加的 global style link

const white_list = ["o-global-link"];

const OLDHREF = Symbol("oldHref");

$.register({
  tag: "o-global-link",
  attrs: {
    href: "",
  },
  watch: {
    href() {
      this._adjustLink();
    },
  },
  proto: {
    _removeOld() {
      if (this[OLDHREF]) {
        // 去掉旧的份额
        const oldIndex = globalLinks.indexOf(this[OLDHREF]);

        if (oldIndex > -1) {
          globalLinks.splice(oldIndex, 1);
        }
      }
    },
    _adjustLink() {
      const fixedHref = `${new URL(this.href, location).href}?v=${pkg.version}`;

      if (this[OLDHREF] === fixedHref) {
        return;
      }

      this._removeOld();

      this[OLDHREF] = fixedHref;

      globalLinks.push(fixedHref); // 添加到份额内
    },
  },
  attached() {
    this._adjustLink();
  },
  detached() {
    this._removeOld();
  },
});

$.extensions.afterAttached = (el) => {
  if (el.tag !== "o-global-link") {
    // 添加 globalLink
    if (!white_list.includes(el.tag) && el.shadow) {
      // 添加 globalLink
      globalLinks.forEach((href) => {
        el.shadow.push(`<link rel="stylesheet" href="${href}">`);
      });
    }
  }
};
