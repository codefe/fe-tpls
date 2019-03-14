<template>
    <div id="err"></div>
</template>

<script>
    export default {
        mounted() {
            this.init()
        },
        methods: {
            init() {
                var canvas = document.createElement('canvas'),
                    err = document.querySelector('#err'),
                    height = canvas.height = 500,
                    width = canvas.width = parseInt(this.get_size(err).width),
                    ctx = canvas.getContext('2d');
                err.appendChild(canvas);

                var word_arr = [],
                    txt_min_size = 5,
                    txt_max_size = 25;
                for (var i = 0; i < 25; i++) {
                    word_arr.push({
                        x : this.random(0,width),
                        y : this.random(0,height),
                        text : '404',
                        size : this.random(txt_min_size,txt_max_size)
                    });

                    word_arr.push({
                        x : this.random(0,width),
                        y : this.random(0,height),
                        text : 'page',
                        size : this.random(txt_min_size,txt_max_size)
                    });

                    word_arr.push({
                        x : this.random(0,width),
                        y : this.random(0,height),
                        text : 'not found',
                        size : this.random(txt_min_size,txt_max_size)
                    });

                    word_arr.push({
                        x : this.random(0,width),
                        y : this.random(0,height),
                        text : '404',
                        size : Math.floor(this.random(txt_min_size,txt_max_size))
                    });
                }
                this.render(ctx,width,height,word_arr,txt_min_size,txt_max_size)
            },
            get_size(obj){
                var style = null;
                if (window.getComputedStyle) {
                    style = window.getComputedStyle(obj, null);    // 非IE
                } else {
                    style = obj.currentStyle;  // IE
                }
                return style
            },
            random(min,max) {
                return Math.random()*(max-min+1)+min;
            },
            range_map(value,in_min, in_max, out_min, out_max) {
                return (value - in_min) * (out_max - out_min) / (in_max - in_min) + out_min;
            },
            render(ctx,width,height,word_arr,txt_min_size,txt_max_size) {
                ctx.fillStyle = "#fff";
                ctx.fillRect(0,0,width,height);

                ctx.fillStyle = "#888";
                for (var i = 0; i < word_arr.length; i++) {
                    ctx.font = word_arr[i].size+"px sans-serif";
                    var w = ctx.measureText(word_arr[i].text);
                    ctx.fillText(word_arr[i].text,word_arr[i].x,word_arr[i].y);

                    word_arr[i].x += this.range_map(word_arr[i].size,txt_min_size,txt_max_size,2,3);

                    if(word_arr[i].x >= width)
                    {
                        word_arr[i].x = -w.width*2;
                        word_arr[i].y = this.random(0,height);
                        word_arr[i].size =  Math.floor(this.random(txt_min_size,txt_max_size));

                    }
                }
                ctx.fill();
                requestAnimationFrame(()=>{
                    this.render(ctx,width,height,word_arr,txt_min_size,txt_max_size)
                })
            }
        }
    }
</script>

<style scoped>
#err{
    margin: 20px;
}
</style>