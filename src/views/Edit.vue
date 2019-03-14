<template>
    <div>
        <section class="navigation">
            <router-link to="/">Home</router-link>编辑文件
        </section>
        <section class="flex column editbox" id="form">
            <section class="flex">
                <label for="">文件名</label><input v-model="filename" name="subTitle" type="text">
            </section>
            <section class="flex">
                <label for="">标题</label><input v-model="title" name="subTitle" type="text">
            </section>
            <section class="flex">
                <label for="">内容</label><div id="editor" class="flex-item"></div>
            </section>
            <section><button @click="saveFile">保存文件</button></section>
        </section>
    </div>
</template>

<script>
    import Editor from 'wangeditor'
    import { fun } from '@/assets/js/fun.js'
    export default {
        data () {
            return {
                title: '',
                content: '',
                filename: 's'
            }
        },
        mounted () {
            this.content = new Editor('#editor')
            this.content.customConfig.uploadImgShowBase64 = true
            this.content.customConfig.showLinkImg = true //false为隐藏网络图片，只能本地上传
            this.content.create()
            this.content.txt.html()
        },
        methods: {
            saveFile() {
                document.execCommand('saveas','true','11.htm');
				var obj = document.querySelector('#form');
				var data = obj.querySelectorAll('input,textarea');
                
                var json = {
                    sta:1,
                    data:{
                        subTitle: this.title,
                        content: this.content.txt.html()
                    }
                };
				
                if(json.data.filename==='' || json.data.subTitle==='' || json.data.content===''){
                    fun.pop.alert('文件名,标题,内容不能为空！')
                }else{
                    this.download(this.filename+".json",JSON.stringify(json).replace(/(<!--).*?(-->)/g,''));
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
    section{
        margin-bottom: 20px;
        textarea{
            width: 100%;
            height: 400px;
            border: 1px solid #eee;
            padding: 10px;
        }
        input{
            width: 100%;
            border: 1px solid #ccc;
            padding: 10px;
        }
        textarea:focus, input:focus {
            border-bottom-color: #13d478;
            color:#01c26f;
        }
        label{
            width: 80px;
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