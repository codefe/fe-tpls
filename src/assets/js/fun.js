export const fun = {
    //弹窗
    pop: {
        initflag : false,
        bg : null,
        cont:null,
        msg : null,
        ok : null,
        init() {
            if (this.initflag){
                this.show();
                return;
            }
            var txt = '<div class="alert-ui-bg"></div><div class="alert-ui-cont"><div class="alert-ui-tit">提示</div><div class="alert-ui-msg"></div><div class="alert-ui-btnc"><a class="alert-ui-btn-ok">确定</a></div></div>';
            var obj = document.createElement('div');
            obj.innerHTML = txt;
            obj.className = 'pop';
            document.body.appendChild(obj);
            var WIN_W = window.innerWidth;
                this.bg   =  document.querySelector('.alert-ui-bg');
                this.cont =  document.querySelector('.alert-ui-cont');
                this.msg  =  document.querySelector('.alert-ui-msg');
                this.ok   =  document.querySelector('.alert-ui-btn-ok');
                
            this.cont.style.left = (WIN_W-250)/2 + 'px';
            this.initflag = true;
            this.ok.addEventListener('click',this.hide);
            this.bg.addEventListener('click',this.hide);
        },
        alert(msg) {
            this.init();
            this.msg.innerHTML = msg;
        },
        hasClass(ele, cls){
            return ele.className.match(new RegExp("(\\s|^)" + cls + "(\\s|$)"));
        },
        addClass(ele, cls){
            if (!this.hasClass(ele, cls)) ele.className += " " + cls;
        },
        removeClass(ele, cls) {
            if (this.hasClass(ele, cls)) {
                var reg = new RegExp("(\\s|^)" + cls + "(\\s|$)");
                ele.className = ele.className.replace(reg, " ");
            }
        },
        hide(){
            fun.pop.addClass(fun.pop.cont,'alert-hide');
            setTimeout(function(){
                fun.pop.cont.style.display="none";
                fun.pop.bg.style.display="none";
            },300);
        },
        show(){
            this.bg.style.display = 'block';
            this.removeClass(this.cont, 'alert-hide');
            this.cont.style.display = 'block';
            this.cont.style.left = (window.innerWidth-250)/2 + 'px';
        }
    }
}