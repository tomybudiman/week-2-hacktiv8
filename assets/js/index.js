$(document).ready(function(){
    //==> Welcome Screen
    $("#begin").on("click",function(){
        // Hide Welcome Screen
        $("#welcome").animate({
            top:"-100%"
        },1000,"easeInOutQuart",function(){
            $(this).css("display","none");
            // Show Input Story Page
            $("#form").css("display","block").animate({
                opacity:1
            },500);
        });
    });

    //==> Input Story
    var story={}; // Create Empty JS Object
    var inputTitle=$("#your-title");
    var inputStory=$("#your-story");
    var lastStoryId;
    $("#publish").on("click",function(){
        // If Name & Story is not Empty
        if(inputTitle.val().length !== 0 && inputStory.val().length !== 0){
            var storyContent=inputStory.val().replace(/\n/g,"&").split("&&"); // Split string into array
            story["storyTitle"]=inputTitle.val(); // Inject string into JS object
            story["storyContent"]=storyContent; // Inject array into JS object
            lastStoryId=story.storyContent.length;
            // Hide Input Story Page
            $("#form").animate({
                opacity:0
            },500,function(){
                $(this).css("display","none");
            });
            // Show Result Page
            setTimeout(function(){
                createStoryline(); // Call Create Storyline Function
                $("#result").css("display","block").animate({
                    top:0
                },1000,"easeInOutQuart",function(){
                    $("#result-container").css("display","block").animate({
                        opacity:1
                    },500);
                    $(".nav-story").css("visibility","visible");
                });
            },500);
        // If Name & Story is Empty
        }else{
            alert("Please fill your name / story!");
            story={};
        }
    });
    //==> Show Story
    function createStoryline(){
        $("#story-title").html(story.storyTitle);
        for(var i=0;i < story.storyContent.length;i++){
            var createList=document.createElement("LI");
            var createSpan=document.createElement("SPAN");
            var eachParagraph=document.createTextNode(story.storyContent[i]);
            /* ----- */
            createSpan.appendChild(eachParagraph);
            createList.appendChild(createSpan);
            createList.setAttribute("story-id",i);
            if(i === 0){
                createList.className="story-active";
            }
            /* ----- */
            $("#story-content").append(createList);
        }
    }
    //==> Navigate Story
    // Previous Slide
    $("#nav-story-prev").on("click",function(){
        var storyActive=$(".story-active");
        console.log(parseInt(storyActive["0"].attributes["0"].value));
        if(parseInt(storyActive["0"].attributes["0"].value) !== 0){
            storyActive.fadeOut(500,function(){
                $(this).removeAttr("style").prev("li").fadeIn(500).addClass("story-active");
            }).removeAttr("class");
        }
    });
    // Next Slide
    $("#nav-story-next").on("click",function(){
        var storyActive=$(".story-active");
        if(parseInt(storyActive["0"].attributes["0"].value)+1 !== lastStoryId){
            storyActive.fadeOut(500,function(){
                $(this).removeAttr("style").next("li").fadeIn(500).addClass("story-active");
            }).removeAttr("class");
        }
    });
});