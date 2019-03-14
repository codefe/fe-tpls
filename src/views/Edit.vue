<template>
    <div>
        <section class="navigation">
            <router-link to="/">Home</router-link>编辑文件
        </section>
        <section class="editbox" id="form">
            <p class="flex">
                <label for="">标题</label><input name="subTitle" type="text">
            </p>
            <p class="flex">
                <label for="">内容</label><textarea name="content" cols="30" rows="10"></textarea>
            </p>
            <p><button @click="saveFile">保存文件</button></p>
        </section>
    </div>
</template>

<script>
    import { fun } from '@/assets/js/fun.js'
    export default {
        methods: {
            saveFile() {
                document.execCommand('saveas','true','11.htm');
				var obj = document.querySelector('#form');
				var data = obj.querySelectorAll('input,textarea');
                
                var json = {sta:1,data:{}};
				for(var i=0,len=data.length;i<len;i++){
					json.data[data[i].name] = data[i].value;
                }
                if(json.data.subTitle==='' || json.data.content===''){
                    fun.pop.alert('标题与内容不能为空！')
                }else{
                    this.download("s1-.json",JSON.stringify(json).replace(/(<!--).*?(-->)/g,''));
                }
            },
            fake_click(obj) {
                var ev = document.createEvent("MouseEvents");
				ev.initMouseEvent(
					"click", true, false, window, 0, 0, 0, 0, 0
					, false, false, false, false, 0, null
					);
				obj.dispatchEvent(ev);
            },
            download(name,data) {
                var urlObject = window.URL || window.webkitURL || window;
				var downloadData = new Blob([data]);
				var save_link = document.createElementNS("http://www.w3.org/1999/xhtml", "a");
				save_link.href = urlObject.createObjectURL(downloadData);
				save_link.download = name;
				this.fake_click(save_link,name);
            }
        }
    }
</script>

<style lang="scss" scoped>
.editbox{
    margin: 20px;
    p{
        margin-bottom: 20px;
        textarea{
            width: 100%;
            height: 400px;
            border: 1px solid #eee;
            padding: 10px;
        }
        input{
            width: 100%;
            border: 1px solid #eee;
            padding: 10px;
        }
        textarea:focus, input:focus {
            border-bottom-color: #13d478;
            color:#01c26f;
        }
        label{
            width: 60px;
            padding: 10px;
        }
        button{
            width: 150px;
            height: 40px;
            background-color: #f05050;
            border:1px solid #f05050;
            color:#fff;
            cursor:pointer;
            margin-left: 55px;
            border-radius: 3px;
            position: relative;
            &:after{
                content: "";
                background: #fff;
                position: absolute;
                width: 150px;
                height: 150px;
                left: 0;
                right: 0;
                top: 0;
                bottom: 0;
                opacity: 0;
                margin: auto;
                border-radius: 50%;
                transform: scale(1);
                transition: all 0.75s ease-in-out;
            }
            &:active:after{
                transform: scale(0);
                opacity: 1;
                transition: 0s;
            }
        }
    }
}
</style>