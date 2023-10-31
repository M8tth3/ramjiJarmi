---
comments: true
layout: post
title: Randomly appearing text
description: souls
courses: { pp: {week: 4} }
type: hacks
---
<style>
    #chat {
        position:absolute;
    }
</style>
<html>
    <div id="chat">
        ~ChosenUndead
    </div>
    <button onclick="randomPos()"> Randomize Position </button>
<html>

<script>
    function randomPos()
    {
        const chat = document.getElementById("chat");
        var paddingX = (Math.random()*(35-5)+5);
        var paddingY = (Math.random()*(35-5)+5);
        chat.style.padding = `${paddingX}px ${paddingY}px`;
    }

</script>