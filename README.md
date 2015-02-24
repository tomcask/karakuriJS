KarakuriJS
==============

A micro Finite State Machine implementation in JavaScript.  

Demo
====

Simple expanding box example:  http://jsbin.com/hihahevonu/edit

Usage
=====

Include the karakuri.js file, and then create a new karakuri() object, supports the following options:

* states [required] - an object representing the allowed states for the Finite State Machine, properties of each state then represent the state's valid event handlers
* initialState [required] - the state which the machine will move into immediately.

History
=======
http://en.wikipedia.org/wiki/Karakuri_puppet
Karakuri puppets (からくり人形 karakuri ningyō?) are traditional Japanese mechanized puppets or automata, originally made from the 17th century to 19th century. The word karakuri means "mechanisms" or "trick".[1] The dolls' gestures provided a form of entertainment.

