import './main.styl'

let bouns = ['一等奖','二等奖','三等奖','四等奖','五等奖','六等奖',
'纪念奖','参与奖','没有奖','特别奖','六等奖','五等奖']
let fragment = document.createDocumentFragment()
bouns.forEach((item,index)=>{
    let piece = document.createElement('div')
    piece.className='slice slice-'+index
    piece.innerHTML='<span>'+item+'</span>'
    fragment.appendChild(piece)
})
document.querySelector('#viewport').appendChild(fragment)
let degree = 30
let initdegree  = 720//转2圈
let time = 16*1000  //转动时间
let isclick = true 
document.querySelector('.start > span').onclick=function(e){
    if(isclick){
        let n = randomArr(0,(360/degree)-1)//n就是抽中第几个 12片就是0-11
        let totaldegree = -(degree*(n+1)+initdegree+degree*0.5 )//转的度数还要加上扇形一半，这样每次转到中间
        isclick =false
        let div = document.querySelector('#viewport')
        div.style.transform='rotate('+totaldegree+'deg)'
        div.style.transition='transform 16s cubic-bezier(0,.47,.31,1.03)'
        setTimeout(() => {
            alert('抽中了'+bouns[n]+'!');
            isclick=true
            div.style.transform='rotate('+ 0 +'deg)'
            div.style.transition='none'
        }, time);
    }
}
function randomArr (start,end){
    return Math.round(start+Math.random()*(end-start))
}
