window.onload = function() {
    function byId(id){
        return typeof(id) === "string"?document.getElementById(id):id;
    }
    function siblings(elm) {
        var a = [];
        var p = elm.parentNode.children;
        for(var i =0,pl= p.length;i<pl;i++) {
         if(p[i] !== elm) a.push(p[i]);
        }
        return a;
       }
    function addClass(obj, cls){
       var obj_class = obj.className,
        blank = (obj_class != '') ? ' ' : '';
        added = obj_class + blank + cls;
        obj.className = added;
    }

    function removeClass(obj, cls){
     var obj_class = ' '+obj.className+' ';
     obj_class = obj_class.replace(/(\s+)/gi, ' '),
    removed = obj_class.replace(' '+cls+' ', ' ');
     removed = removed.replace(/(^\s+)|(\s+$)/g, '');
    obj.className = removed;
    }

    //方法
    var bgPic =byId('bgPic');
    clientY=parseFloat(document.documentElement.clientHeight)
    bgPic.setAttribute('style', `height: ${clientY}px`);
    var picScale = clientY/1080
    var index = {i:0}
    function check (){
        if(index.i === 0){
            byId(left).style.display="none"
        }else if(index.i===9 ){
            byId(right).style.display="none"
        }
        else {
            byId(right).style.display="block"
            byId(left).style.display="block"
        }
    }
    check()
    let frist = byId("1")
    console.log(frist);
    
    addClass(frist,"show")
    //初始化
    var prev = byId('left')
    var next = byId('right')
    var eachStep = [1226,1226,1226,1226,1226,1226,1226,1226,1226,]
    //可以自定义每次走多少
    var currentStep 
    function animate(dis) {
        currentStep = dis
        dis = dis * picScale
        bgPic.style.transform = `translateX(${dis}px)`;
    }
    prev.onclick = function() {
        if (index.i<1)return
        index.i = index.i -1
        let backStep = eachStep[index.i]
        currentStep =  currentStep + backStep
        animate(currentStep)
        lidom = byId(`${index.i+1}`)
        addClass(lidom,"show")
        let bros = siblings(lidom)
        bros.map((bro)=>{
            removeClass(bro,"show")
        })
        check()
    }
    next.onclick = function() {
        console.log(index.i);
        if(index.i>8)return
        let step = eachStep.reduce((acc,value,i)=>{
            if(i>index.i){return acc}
            else{
                return value + acc
            }
        })
        animate(-step)
        index.i=index.i+1
        lidom = byId(`${index.i+1}`)
        addClass(lidom,"show")
        let bros = siblings(lidom)
        bros.map((bro)=>{
            removeClass(bro,"show")
        })
        check()
    }
    byId(list).onclick = function(e){

        
        function checkli (){
            if(e.target.id == 1){
                byId('left').style.display="none"
                byId('right').style.display="block"
            }
            if(e.target.id == 10 ){
                byId('right').style.display="none"
                byId('left').style.display="block"
            }
        }
        console.log(e.target.id);
        checkli()
        addClass(e.target,"show")
        let bros = siblings(e.target)
        bros.map((bro)=>{
            removeClass(bro,"show")
        })

        if(e.target.nodeName.toLowerCase() === "li"){
            let step
            console.log(e.target.id);
            if (e.target.id == 1){
                console.log(23)
                step=0
            } 
            else{
            step = eachStep.reduce((acc,value,i)=>{
                if(i>(e.target.id-2)){return acc}
                else{
                    return value + acc
                }
            })}

            animate(-step)
        }
        
        console.log(index.i);
        
    }
    setTimeout(()=>{
        byId("loading").style.display="none"
    },
    
    3000)
}

