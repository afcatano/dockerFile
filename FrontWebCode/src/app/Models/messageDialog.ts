
  export class DialogData {

    public icon: string;
    public msg: string;
    public title: string;
  
    constructor(msg, icon,title) {
      this.icon = icon;
      this.msg = msg;
      this.title = title;
    }
  
    geticon = () => {
      return this.icon;
    }
  
    seticon = (icon) => {
      this.icon = icon;
    }
  
    getmsg = () => {
      return this.icon;
    }
  
    setmsg = (msg) => {
      this.msg=msg;
    }
  
    gettitle = () => {
        return this.title;
      }
    
    settitle = (title) => {
    this.title=title;
    }

    toJSON = () => ({
      user: this.icon,
      msg: this.msg,
      title: this.title
    })
  
  }