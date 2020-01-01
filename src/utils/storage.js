class Storage {
  constructor(key) {
    this.key = key;
    this.baseData = {};
    this.init();
  }

  init() {
    let data = window.localStorage.getItem(this.key);
    if (!data) {
      window.localStorage.setItem(this.key, JSON.stringify(this.baseData));
    } else {
      try {
        data = JSON.parse(data);
      } catch (error) {
        data = JSON.parse(JSON.stringify(data));
      }
      this.baseData = data;
    }
  }

  get(key = '') {
    if (!key) {
      return undefined;
    }
    if (key in this.baseData) {
      return this.baseData[key];
    } else {
      return undefined;
    }
  }

  set(key = '', value) {
    if (!key || !value) {
      return;
    }
    this.baseData[key] = value;
    window.localStorage.setItem(this.key, JSON.stringify(this.baseData));
  }

  remove(key = '') {
    if (!key) {
      return undefined;
    }
    if (key in this.baseData) {
      delete this.baseData[key];
      window.localStorage.setItem(this.key, JSON.stringify(this.baseData));
    }
  }

  clearAll() {
    this.baseData = {};
    window.localStorage.setItem(this.key, JSON.stringify(this.baseData));
  }
}

const aaa = new Storage('iamman');

window.$aaa = aaa;
