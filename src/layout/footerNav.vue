<template>
	 <div class='footer'>
        <p class="intro">
            <span>成绩管理系统</span>
        </p>
        <p class="beian"><span>有疑问请联系我</span>wshish000</p>
    </div>
</template>


<script>

export default {
    name: "footerNav",
	data(){
		return {
		}
	},
	methods:{

	}
}
</script>

<style lang="less">
	.footer{
        width: 100%;
        padding: 10px 0;
        font-size:12px;
        text-align: center;
        background: #fff;
        p{
            line-height: 30px;
        }
        .intro{
            width: 240px;
            margin: 0 auto;
            justify-content: space-between;
            align-items: center;
        }
    }
</style>


