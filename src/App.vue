<template>
  <div id="full-page">
    <router-view />
  </div>
</template>

<style>
/*
html5doctor.com Reset Stylesheet
v1.6.1
Last Updated: 2010-09-17
Author: Richard Clark - http://richclarkdesign.com
Twitter: @rich_clark
*/

html,
body,
div,
span,
object,
iframe,
h1,
h2,
h3,
h4,
h5,
h6,
p,
blockquote,
pre,
abbr,
address,
cite,
code,
del,
dfn,
em,
img,
ins,
kbd,
q,
samp,
small,
strong,
sub,
sup,
var,
b,
i,
dl,
dt,
dd,
ol,
ul,
li,
fieldset,
form,
label,
legend,
table,
caption,
tbody,
tfoot,
thead,
tr,
th,
td,
article,
aside,
canvas,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section,
summary,
time,
mark,
audio,
video {
  margin: 0;
  padding: 0;
  border: 0;
  outline: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

body {
  line-height: 1;
}

article,
aside,
details,
figcaption,
figure,
footer,
header,
hgroup,
menu,
nav,
section {
  display: block;
}

nav ul {
  list-style: none;
}

blockquote,
q {
  quotes: none;
}

blockquote:before,
blockquote:after,
q:before,
q:after {
  content: "";
  content: none;
}

a {
  margin: 0;
  padding: 0;
  font-size: 100%;
  vertical-align: baseline;
  background: transparent;
}

/* change colours to suit your needs */
ins {
  background-color: #ff9;
  color: #000;
  text-decoration: none;
}

/* change colours to suit your needs */
mark {
  background-color: #ff9;
  color: #000;
  font-style: italic;
  font-weight: bold;
}

del {
  text-decoration: line-through;
}

abbr[title],
dfn[title] {
  border-bottom: 1px dotted;
  cursor: help;
}

table {
  border-collapse: collapse;
  border-spacing: 0;
}

/* change border colour to suit your needs */
hr {
  display: block;
  height: 1px;
  border: 0;
  border-top: 1px solid #cccccc;
  margin: 1em 0;
  padding: 0;
}

input,
select {
  vertical-align: middle;
}

* {
  box-sizing: border-box;
}

ul,
li {
  list-style: none;
}

.error {
  color: red;
}

.error-message {
  margin-bottom: 0px;
}

#full-page {
  height: 100vh;
  width: 100vw;
  background-color: #f5f9fc;
}

.wrapper {
  height: calc(100vh - 70px);
  display: flex;
  align-items: center;
  justify-content: center;
}

.container {
  padding: 20px;
  background: hsl(0 0% 100%);
  box-shadow: 0 2.5rem 2rem -2rem hsl(200 50% 20% / 40%);
}

.header {
  height: 70px;
  background-color: #16a2b8;
}

.header-title {
  line-height: 70px;
  text-align: center;
  color: white;
  cursor: pointer;
}

.mypage-content {
  border: 1px solid black;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  padding: 20px;
  height: 100%;
}

.password-form {
  position: relative;
}

.eye-icon {
  cursor: pointer;
  position: absolute;
  top: 42px;
  right: 10px;
}

/* todo表示関連 */
.display-today {
  padding-left: 10px;
  color: rgb(133, 133, 133);
}

.add-btn-wrap {
  text-align: center;
}

.line {
  border-color: #16a2b8;
}

.todo-line {
  display: flex;
}

.todo-line:hover {
  border-radius: 5px;
  background-color: #daf0f3;
}

.check-wrap {
  padding: 15px 0 15px 10px;
}

.todo-content-wrap {
  width: 100%;
  display: flex;
  justify-content: space-between;
  border-bottom: 1px solid lightgray;
  padding: 15px 0;
}

.todo-txt-wrap {
  display: flex;
}

.todo-icon-date-wrap {
  display: flex;
}

.todo-icon {
  cursor: pointer;
  color: #16a2b8;
}

.todo-date {
  width: 50px;
  margin-bottom: 0px;
}
</style>
