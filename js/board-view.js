$(function(){
    $("nav > ul:first > li:nth-child(2), .submenu1").hover(function() {
        $(".submenu1").stop().slideDown(300);
        $(".fast_search").css("visibility", "hidden");
    }, function() {
        $(".submenu1").stop().slideUp(300);
        $(".fast_search").css("visibility", "visible");
    });
    
    $("nav > ul:last > li:nth-child(2), .submenu2").hover(function() {
        $(".submenu2").stop().slideDown(300);
        $(".fast_search").css("visibility", "hidden");
    }, function() {
        $(".submenu2").stop().slideUp(300);
        $(".fast_search").css("visibility", "visible");
    });
    
    // 로그인 버튼 누르면 header_top_right 모두 사라지고
    // 정민영님 환영합니다. / 사람아이콘 / 로그아웃버튼
    // 으로 치환되게 만들어야함
    function authed(){
        $(".header_top_right ul").hide();
        $(".header_top_right ul:last").show();
        $(".header_top_right ul:last").css("padding-top", "20px");
    }
    
    if(sessionStorage.getItem("login") == 'a'){
        authed();
    }

    $('[value="로그인"]').click(function(){
        sessionStorage.setItem("login", "a");
        authed();
    });

    $('[value="로그아웃"]').click(function(){
        sessionStorage.setItem("login", "b");
        $(".header_top_right ul").show();
        $(".header_top_right ul:last").hide();
        console.log($(location).attr('pathname'));
        if($(location).attr('pathname') == "/resultGame.jsp"){
            window.location.replace("index");
        }
    });

    $('.confirm').click(function(){
        sessionStorage.setItem("login", "b");
        $(".header_top_right ul").show();
        $(".header_top_right ul:last").hide();
    })

    // 로그인 상태가 아닐 때
    // 마이페이지 접근 불가로 만들어야함
    // 마이페이지 + 정보수정 + 구매한게임 모두.
    $('nav > ul:last > li:last a').click(function(){
        if(sessionStorage.getItem("login") == 'b'){
            $("nav > ul:last > li:last a").prop("href", "#");
            // alert("로그인 해주세요.");
            $("#dialog").dialog({
                modal: true,
                resizable: false,
                dragable: false,
                height: "auto",
                buttons: {
                    Ok: function() {
                    $( this ).dialog( "close" );
                    }
                }
            });
        }else{
            $("nav > ul:last > li:last a").prop("href", "updateMember");
            $("nav > ul:last > li:last > ul > li:last a").prop("href", "boughtGame.jsp");
        }
    })

    // slide menu
    var currentPos = parseInt($("#slidemenu").css("top"));
    $(window).scroll(function(){
        var position = $(window).scrollTop();
        $("#slidemenu").stop().animate({"top" : position + currentPos + "px"}, 10);
    });

    // beginer guide open
    function openGuide(){
        guidePop = window.open('guidePop',  'height=650,width=950,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes,dependent=yes');
    }

    // 버튼 onclick 속성에서 click event로 젼환
    $("[value='간편로그인'").click(function(){
        window.location.href = 'easyLogin.jsp';
    });
    $("[value='ID/PW찾기'").click(function(){
        window.location.href = 'findMember.jsp';
    });
    $("[value='회원가입'").click(function(){
        window.location.href = 'regist.jsp';
    });
    $("#container > div > button").click(function(){
        window.location.href = 'board-list.jsp';
    })
})
