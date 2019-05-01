// Copyright (c) 2018, Dongseong Hwang. All rights reserved.
// Use of this source code is governed by a BSD-style license that can be
// found in the LICENSE file.

function getUtil() {
  'use strict';

  function getShaderSource(id) {
    return document.getElementById(id).textContent.replace(/^\s+|\s+$/g, '');
  };

  function createShader(gl, source, type) {
    var shader = gl.createShader(type);
    gl.shaderSource(shader, source);
    gl.compileShader(shader);
    return shader;
  }

  function createProgram(gl, vertexShaderSource, fragmentShaderSource) {
    var program = gl.createProgram();
    var vshader = createShader(gl, vertexShaderSource, gl.VERTEX_SHADER);
    var fshader = createShader(gl, fragmentShaderSource, gl.FRAGMENT_SHADER);
    gl.attachShader(program, vshader);
    gl.deleteShader(vshader);
    gl.attachShader(program, fshader);
    gl.deleteShader(fshader);
    gl.linkProgram(program);

    var log = gl.getProgramInfoLog(program);
    if (log) {
      console.log(log);
    }

    log = gl.getShaderInfoLog(vshader);
    if (log) {
      console.log(log);
    }

    log = gl.getShaderInfoLog(fshader);
    if (log) {
      console.log(log);
    }

    return program;
  };

  function loadImage(url, onload) {
    var img = new Image();
    img.src = url;
    img.onload = function() { onload(img, img.width, img.height); };
    return img;
  };

  function loadImages(urls, onload) {
    var imgs = [];
    var imgsToLoad = urls.length;

    function onImgLoad() {
      if (--imgsToLoad <= 0) {
        onload(imgs);
      }
    }

    for (var i = 0; i < imgsToLoad; ++i) {
      imgs.push(loadImage(urls[i], onImgLoad));
    }
  };

  function loadObj(url, onload) {
    var xhr = new XMLHttpRequest();
    xhr.open('GET', url, true);
    xhr.responseType = 'text';
    xhr.onload = function(e) {
      var mesh = new OBJ.Mesh(this.response);
      onload(mesh);
    };
    xhr.send();
  };

  return {getShaderSource, createProgram, loadImage, loadImages, loadObj};
}

var util = getUtil();