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
//    function authed(){
//        $(".header_top_right ul").hide();
//        $(".header_top_right ul:last").show();
//        $(".header_top_right ul:last").css("padding-top", "20px");
//    }
//    
//    if(sessionStorage.getItem("login") == 'a'){
//        authed();
//    }
//
//    $('[value="로그인"]').click(function(){
//        sessionStorage.setItem("login", "a");
//        authed();
//    });

//    $('[value="로그아웃"]').click(function(){
//        sessionStorage.setItem("login", "b");
//        $(".header_top_right ul").show();
//        $(".header_top_right ul:last").hide();
//        console.log($(location).attr('pathname'));
//        if($(location).attr('pathname') == "/updateMember"){
//            window.location.replace("index");
//        }
//    });

    $('.confirm').click(function(){
        sessionStorage.setItem("login", "b");
        $(".header_top_right ul").show();
        $(".header_top_right ul:last").hide();
    });

    // slide menu
    var currentPos = parseInt($("#slidemenu").css("top"));
    $(window).scroll(function(){
        var position = $(window).scrollTop();
        $("#slidemenu").stop().animate({"top" : position + currentPos + "px"}, 10);
    });

    // beginer guide open
    function openGuide(){
        guidePop = window.open('guidePop',  'height=650,width=950,toolbar=no,directories=no,status=no,linemenubar=no,scrollbars=no,resizable=no,modal=yes,dependent=yes');
    };

    $(".delete_member").click(function(){
        window.location = "removeMember";
    });

    // 회원수정 취소 버튼 클릭 이벤트
    $("#form > input:last").click(function(){
        window.location.href = "index";
    });

    // 버튼 onclick 속성에서 click event로 젼환
    $("[value='간편로그인'").click(function(){
        window.location.href = 'easyLogin.jsp';
    });
    $("[value='ID/PW찾기'").click(function(){
        window.location.href = 'findMember.jsp';
    });
    $("[value='회원가입'").click(function(){
        window.location.href = 'regist';
    });

    $("#update_ok").click(function(){
        console.log($("#name").val());
        console.log($("#pw1").val());
        console.log($("#pw2").val());
        console.log($("#detailAddress").val());
        if($("#name").val() == "" || $("#name").val().length < 2 || $("#name").val().length > 4){
            $("#name").focus();
            return false;
        }else if($("#pw1").val() == "" || $("#pw1").val().length < 6 || $("#pw1").val().length > 14){
            $("#pw1").focus();
            return false;
        }else if($("#pw2").val() != $("#pw1").val()){
            $("#pw2").focus();
            return false;
        }else if($("#detailAddress").val() == ""){
            $("#detailAddress").focus();
            return false;
        }
        else{
            var maskHeight = $(document).height();
            var maskWidth = $("body").width();
            $(".mask").css({
                'width' : maskWidth,
                'height' : maskHeight
            })
            $("#layer_popup_update").show();
            $(".mask").show();
        }
    });
    
    $("#name").on("input", function(e){
        $(this).val( $(this).val().replace(/[^가-힣]{0,5}/,"") );
        if($(this).val() == "" || $(this).val().length < 2){
            $(".nameinput").show();
            $("#name").css("border-color", "red");
        } else{
            $(".nameinput").hide();
            $("#name").css("border-color", "black");
        }
    })
    if($("#name").val() == "" || $("#name").val().length < 2){
        $(".nameinput").show();
        $("#name").css("border-color", "red");
    } else{
        $(".nameinput").hide();
        $("#name").css("border-color", "black");
    }
    $("#pw1").on("input", function(e){
        if($(this).val() == "" || $(this).val().length < 6){
            $(".pwinput1").show();
            $("#pw1").css("border-color", "red");
        } else{
            $(".pwinput1").hide();
            $("#pw1").css("border-color", "black");
        }
    })
    $("#pw2").on("input", function(e){
        if($(this).val() != $("#pw1").val()){
            $(".pwinput2").show();
            $("#pw2").css("border-color", "red");
        } else{
            $(".pwinput2").hide();
            $("#pw2").css("border-color", "black");
        }
    })
    $("#detailAddress").on("input", function(e){
        if($(this).val() == ""){
            $(".detailinput").show();
            $("#postcode, #roadAddress, #detailAddress").css("border-color", "red");
        } else{
            $(".detailinput").hide();
            $("#postcode, #roadAddress, #detailAddress").css("border-color", "black");
        }
    })
    if($("#detailAddress").val() == ""){
        $(".detailinput").show();
        $("#postcode, #roadAddress, #detailAddress").css("border-color", "red");
    } else{
        $(".detailinput").hide();
        $("#postcode, #roadAddress, #detailAddress").css("border-color", "black");
    }
})

// 우편번호 찾기 API
function sample4_execDaumPostcode() {
    new daum.Postcode({
        oncomplete: function(data) {
            // 팝업에서 검색결과 항목을 클릭했을때 실행할 코드를 작성하는 부분.

            // 도로명 주소의 노출 규칙에 따라 주소를 표시한다.
            // 내려오는 변수가 값이 없는 경우엔 공백('')값을 가지므로, 이를 참고하여 분기 한다.
            var roadAddr = data.roadAddress; // 도로명 주소 변수
            var extraRoadAddr = ''; // 참고 항목 변수

            // 법정동명이 있을 경우 추가한다. (법정리는 제외)
            // 법정동의 경우 마지막 문자가 "동/로/가"로 끝난다.
            if(data.bname !== '' && /[동|로|가]$/g.test(data.bname)){
                extraRoadAddr += data.bname;
            }
            // 건물명이 있고, 공동주택일 경우 추가한다.
            if(data.buildingName !== '' && data.apartment === 'Y'){
            extraRoadAddr += (extraRoadAddr !== '' ? ', ' + data.buildingName : data.buildingName);
            }
            // 표시할 참고항목이 있을 경우, 괄호까지 추가한 최종 문자열을 만든다.
            if(extraRoadAddr !== ''){
                extraRoadAddr = ' (' + extraRoadAddr + ')';
            }

            // 우편번호와 주소 정보를 해당 필드에 넣는다.
            document.getElementById('postcode').value = data.zonecode;
            document.getElementById("roadAddress").value = roadAddr;


            var guideTextBox = document.getElementById("guide");
            // 사용자가 '선택 안함'을 클릭한 경우, 예상 주소라는 표시를 해준다.
            if(data.autoRoadAddress) {
                var expRoadAddr = data.autoRoadAddress + extraRoadAddr;
                guideTextBox.innerHTML = '(예상 도로명 주소 : ' + expRoadAddr + ')';
                guideTextBox.style.display = 'block';

            }else {
                guideTextBox.innerHTML = '';
                guideTextBox.style.display = 'none';
            }
        }
    }).open();
}