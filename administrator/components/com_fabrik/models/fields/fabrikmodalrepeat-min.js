var FabrikModalRepeat=new Class({initialize:function(a,c,b){this.names=c;this.field=b;this.content=false;this.setup=false;this.elid=a;if(!this.ready()){this.timer=this.testReady.periodical(500,this)}else{this.setUp()}},ready:function(){return typeOf(document.id(this.elid))==="null"?false:true},testReady:function(){if(!this.ready()){return}if(this.timer){clearInterval(this.timer)}this.setUp()},setUp:function(){this.button=document.id(this.elid+"_button");this.el=document.id(this.elid).getElement("table");this.el.id=this.elid+"-table";this.field=document.id(this.field);this.button.addEvent("click",function(b){b.stop();if(!this.win){this.win=new Element("div",{styles:{padding:"5px","background-color":"#fff",display:"none","z-index":9999}}).inject(document.body);this.win.adopt(this.el);var c=new Element("button.btn.button.btn-primary").set("text","close");c.addEvent("click",function(d){d.stop();this.store();this.close()}.bind(this));var a=new Element("div.controls.form-actions",{styles:{"text-align":"right","margin-bottom":0}}).adopt(c);this.win.adopt(a);this.win.position();this.mask=new Mask(document.body,{style:{"background-color":"#000",opacity:0.4,"z-index":9998}});this.content=this.el;this.build();this.watchButtons()}this.win.show();this.win.position();this.resizeWin(true);this.win.position();this.mask.show()}.bind(this))},resizeWin:function(a){var c=this.el.getDimensions(true);var b=this.win.getDimensions(true);var d=a?b.y:c.y+30},close:function(){this.win.hide();this.mask.hide()},_getRadioValues:function(){var a=[];this.getTrs().each(function(c){var b=(sel=c.getElement("input[type=radio]:checked"))?sel.get("value"):b="";a.push(b)});return a},_setRadioValues:function(a){this.getTrs().each(function(c,b){if(r=c.getElement("input[type=radio][value="+a[b]+"]")){r.checked="checked"}})},watchButtons:function(){if(this.buttonsWatched){return}this.buttonsWatched=true;this.content.addEvent("click:relay(a.add)",function(b){if(tr=this.findTr(b)){var a=this._getRadioValues();if(tr.getChildren("th").length!==0){this.tmpl.clone().inject(tr,"after")}else{clone=tr.clone();clone.inject(tr,"after")}this.stripe();this._setRadioValues(a);this.resizeWin();if(jQuery){clone.getElements("select").removeClass("chzn-done");clone.getElements(".chzn-container").destroy();jQuery("select").chosen({disable_search_threshold:10,allow_single_deselect:true})}}this.win.position();b.stop()}.bind(this));this.content.addEvent("click:relay(a.remove)",function(b){var a=this.content.getElements("tbody tr");if(a.length<=1){}if(tr=this.findTr(b)){tr.dispose()}this.resizeWin();this.win.position();b.stop()}.bind(this))},getTrs:function(){return this.content.getElement("tbody").getElements("tr")},stripe:function(){trs=this.getTrs();for(var a=0;a<trs.length;a++){trs[a].removeClass("row1").removeClass("row0");trs[a].addClass("row"+a%2);var b=trs[a].getElements("input[type=radio]");b.each(function(c){c.name=c.name.replace(/\[([0-9])\]/,"["+a+"]")})}},build:function(){if(this.setup){return}var c=JSON.decode(this.field.get("value"));if(typeOf(c)==="null"){c={}}var h=this.content.getElement("tbody").getElement("tr");var e=Object.keys(c);var g=e.length===0||c[e[0]].length===0?true:false;var f=g?1:c[e[0]].length;for(var d=1;d<f;d++){h.clone().inject(h,"after")}this.stripe();var b=this.getTrs();for(d=0;d<f;d++){e.each(function(a){b[d].getElements("*[name*="+a+"]").each(function(i){if(i.get("type")==="radio"){if(i.value===c[a][d]){i.checked=true}}else{i.value=c[a][d]}})})}if(g){this.tmpl=h;h.dispose()}},findTr:function(b){var a=b.target.getParents().filter(function(c){return c.get("tag")==="tr"});return(a.length===0)?false:a[0]},store:function(){var c={};for(var b=0;b<this.names.length;b++){var d=this.names[b];var a=this.content.getElements("*[name*="+d+"]");c[d]=[];a.each(function(e){if(e.get("type")==="radio"){if(e.get("checked")===true){c[d].push(e.get("value"))}}else{c[d].push(e.get("value"))}}.bind(this))}this.field.value=JSON.encode(c);return true}});