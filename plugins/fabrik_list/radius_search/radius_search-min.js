function geoCode(){window.addEvent("domready",function(){var c=new google.maps.LatLng(Fabrik.radiusSearch.geocode_default_lat,Fabrik.radiusSearch.geocode_default_long);var a={zoom:4,mapTypeId:google.maps.MapTypeId.ROADMAP};Fabrik.radiusSearch=typeOf(Fabrik.radiusSearch)==="null"?{}:Fabrik.radiusSearch;var b=document.getElements(".radius_search_geocode_map");b.each(function(h){Fabrik.radiusSearch[h.id]=typeOf(Fabrik.radiusSearch[h.id])==="null"?{}:Fabrik.radiusSearch[h.id];Fabrik.radiusSearch[h.id].map=new google.maps.Map(h,a);var k=h.getParent(".radius_search_geocode");var j=k.getParent(".radius_search_options");var e=k.getElement("button");var d=k.getElement(".radius_search_geocode_field");e.addEvent("click",function(n){n.stop();var l=d.value;var m=new google.maps.Geocoder();m.geocode({address:l},function(p,o){if(o===google.maps.GeocoderStatus.OK){var q=p[0].geometry.location;j.getElement("input[name^=radius_search_geocode_lat]").value=q.lat();j.getElement("input[name^=radius_search_geocode_lon]").value=q.lng();Fabrik.radiusSearch[h.id].map.setCenter(p[0].geometry.location);Fabrik.radiusSearch[h.id].marker.setPosition(p[0].geometry.location);document.id("radius_search_lat").value=""}else{alert("Geocode was not successful for the following reason: "+o)}})});var f=j.getElement("input[name=geo_code_def_zoom]").get("value").toInt();var g=j.getElement("input[name=geo_code_def_lat]").get("value").toFloat();var i=j.getElement("input[name=geo_code_def_lon]").get("value").toFloat();Fabrik.fireEvent("google.radiusmap.loaded",[h.id,f,g,i])})})}var FbListRadiusSearch=new Class({Extends:FbListPlugin,options:{geocode_default_lat:"0",geocode_default_long:"0",geocode_default_zoom:4,prefilter:true,prefilterDistance:1000,prefilterDone:false},geocoder:null,map:null,initialize:function(b){this.parent(b);Fabrik.radiusSearch={};var a="radius_search_geocode_map"+this.options.renderOrder;if(typeOf(Fabrik.radiusSearch[a])==="null"){Fabrik.radiusSearch[a]={}}Fabrik.radiusSearch[a].geocode_default_lat=this.options.geocode_default_lat;Fabrik.radiusSearch[a].geocode_default_long=this.options.geocode_default_long;Fabrik.radiusSearch[a].geocode_default_zoom=this.options.geocode_default_zoom;head.ready(function(){Fabrik.addEvent("google.radiusmap.loaded",function(e,f,g,h){var i=new google.maps.LatLng(g,h);if(Fabrik.radiusSearch[e].loaded){return}Fabrik.radiusSearch[e].loaded=true;Fabrik.radiusSearch[e].map.setCenter(i);Fabrik.radiusSearch[e].map.setZoom(f);Fabrik.radiusSearch[e].marker=new google.maps.Marker({map:Fabrik.radiusSearch[e].map,draggable:true,position:i});google.maps.event.addListener(Fabrik.radiusSearch[e].marker,"dragend",function(){var j=Fabrik.radiusSearch[e].marker.getPosition();var k=document.id(e).getParent(".radius_search_options");k.getElement("input[name=radius_search_geocode_lat]").value=j.lat();k.getElement("input[name=radius_search_geocode_lon]").value=j.lng()})}.bind(this));Fabrik.loadGoogleMap(true,"geoCode");this.listform=this.listform.getElement("#radius_search"+this.options.renderOrder);if(typeOf(this.options.value)==="null"){this.options.value=0}this.watchActivate();this.listform.getElements("input[name^=radius_search_type]").addEvent("click",function(f){this.toggleFields(f)}.bind(this));this.options.value=this.options.value.toInt();if(typeOf(this.listform)==="null"){return}var c=this.listform.getElement(".radius_search_distance");var d=this.listform.getElement(".slider_output");this.mySlide=new Slider(this.listform.getElement(".fabrikslider-line"),this.listform.getElement(".knob"),{onChange:function(e){c.value=e;d.set("text",e+this.options.unit)}.bind(this),steps:this.options.steps}).set(0);this.mySlide.set(this.options.value);c.value=this.options.value;d.set("text",this.options.value);if(this.options.myloc&&!this.options.prefilterDone){if(geo_position_js.init()){geo_position_js.getCurrentPosition(function(e){this.setGeoCenter(e)}.bind(this),function(f){this.geoCenterErr(f)}.bind(this),{enableHighAccuracy:true})}}}.bind(this))},watchActivate:function(){this.fx=new Fx.Slide(this.listform.getElement(".radius_search_options"));this.listform.getElements("input[name^=radius_search_active]").addEvent("click",function(a){switch(a.target.get("value")){case"1":this.fx.slideIn();break;case"0":this.fx.slideOut();break}}.bind(this));var b=this.listform.getElements("input[name^=radius_search_active]").filter(function(a){return a.checked===true});if(b.length>0&&b[0].get("value")==="0"){this.fx.slideOut()}},setGeoCenter:function(a){this.geocenterpoint=a;this.geoCenter(a);this.prefilter()},prefilter:function(){if(this.options.prefilter){this.fx.slideIn();this.mySlide.set(this.options.prefilterDistance);this.listform.getElements("input[name^=radius_search_active]").filter(function(a){return a.get("value")==="1"}).getLast().checked=true;this.listform.getElements("input[value=mylocation]").checked=true;this.list.submit("filter")}},geoCenter:function(a){if(typeOf(a)==="null"){alert(Joomla.JText._("PLG_VIEW_RADIUS_NO_GEOLOCATION_AVAILABLE"))}else{this.listform.getElement("input[name=radius_search_lat]").value=a.coords.latitude.toFixed(2);this.listform.getElement("input[name=radius_search_lon]").value=a.coords.longitude.toFixed(2)}},geoCenterErr:function(a){fconsole("geo location error="+a.message)},toggleActive:function(a){},toggleFields:function(a){switch(a.target.get("value")){case"latlon":this.listform.getElement(".radius_search_place_container").hide();this.listform.getElement(".radius_search_coords_container").show();this.listform.getElement(".radius_search_geocode").hide();break;case"mylocation":this.listform.getElement(".radius_search_place_container").hide();this.listform.getElement(".radius_search_coords_container").hide();this.listform.getElement(".radius_search_geocode").hide();this.setGeoCenter(this.geocenterpoint);break;case"place":this.listform.getElement(".radius_search_place_container").show();this.listform.getElement(".radius_search_coords_container").hide();this.listform.getElement(".radius_search_geocode").hide();break;case"geocode":this.listform.getElement(".radius_search_place_container").hide();this.listform.getElement(".radius_search_coords_container").hide();this.listform.getElement(".radius_search_geocode").show();break}},clearFilter:function(){this.listform.getElements("input[name^=radius_search_active]").filter(function(a){return a.get("value")==="0"}).getLast().checked=true}});