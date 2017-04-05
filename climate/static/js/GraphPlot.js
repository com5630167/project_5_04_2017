    var temp="1"; 
    $("#vars").val(temp);


    var carsAndModels = {};
    carsAndModels['1'] = ['max','min','avg','-----','su', 'fd', 'id','tr','gsl','wsdi','csdi','dtr','txx','tnx','txn','tnn','tn10p','tx10p','tn90p','tx90p'];
    carsAndModels['2'] = ['max','min','avg','-----','rx1day', 'rx5day', 'sdii', 'r10mm','r20mm','rnnmm','cdd','cwd','r95ptot','r99ptot','prcptot'];

    function ChangeCarList() {
        var carList = document.getElementById("vars");
        var modelList = document.getElementById("cindex");
        var selCar = carList.options[carList.selectedIndex].value;

        console.log(selCar);

        while (modelList.options.length) {
            modelList.remove(0);
        }
        var cars = carsAndModels[selCar];
        if (cars) {
            var i;
            for (i = 0; i < cars.length; i++) {
                var car = new Option(cars[i], i);
                modelList.options.add(car);
            }
        }
    } 
   
///////////////////////////////////////////////////////////////////////////
//////////////////// Plot Graph Average Max Min ///////////////////////////
/////////////////////////////////////////////////////////////////////////// 
        function getCookie(name) {
               var cookieValue = null;
               if (document.cookie && document.cookie != '') {
                 var cookies = document.cookie.split(';');
                 for (var i = 0; i < cookies.length; i++) {
                 var cookie = jQuery.trim(cookies[i]);
                 // Does this cookie string begin with the name we want?
                 if (cookie.substring(0, name.length + 1) == (name + '=')) {
                     cookieValue = decodeURIComponent(cookie.substring(name.length + 1));
                     break;
                  }
             }
         }
         return cookieValue;
        }
        function data(data,index,vars){
             // document.getElementById("map_p").innerHTML = index+data['path_file'];
             d3.select("#map").selectAll("svg").remove();
             d3.select("#map2").selectAll("svg").remove();
             d3.select("#map3").selectAll("svg").remove();
             document.getElementById("des_map").innerHTML = "";
             select_var(data,vars,index);
        }
        function select_var(data,x,y){
                       //document.getElementById("demo").innerHTML = z;

                     if(x==1&&y=='txx'){
                        chart_clim(data,"Celsius",' Monthly maximum value of daily maximum temperature');
                        document.getElementById("des_map").innerHTML = "Monthly maximum value of daily maximum temperature:Let TXx be the daily maximum temperatures in month k, period j. The maximum daily maximum temperature each month is then:TXxkj=max(TXxkj) ";
                      }else if(x==1&&y=='tnx'){
                        chart_clim(data,"Celsius",' Monthly maximum value of daily minimum temperature');
                        document.getElementById("des_map").innerHTML = "Monthly maximum value of daily minimum temperature:Let TNx be the daily minimum temperatures in month k, period j. The maximum daily minimum temperature each month is then:TNxkj=max(TNxkj) ";
                      }else if(x==1&&y=='txn'){
                        chart_clim(data,"Celsius",' Monthly minimum value of daily maximum temperature');
                        document.getElementById("des_map").innerHTML = "Monthly minimum value of daily maximum temperature:Let TXn be the daily maximum temperatures in month k, period j. The minimum daily maximum temperature each month is then: TXnkj=min(TXnkj) ";
                      }else if(x==1&&y=='tnn'){
                        chart_clim(data,"Celsius",' Monthly minimum value of daily minimum temperature');
                        document.getElementById("des_map").innerHTML = "Monthly minimum value of daily minimum temperature: Let TNn be the daily minimum temperatures in month k, period j. The minimum daily minimum temperature each month is then: TNnkj=min(TNnkj) ";
                      }else if(x==1&&y=='tn10p'){
                        chart_clim(data,"Percentage",' Percentage of days when TN < 10th percentile');
                        document.getElementById("des_map").innerHTML = "Percentage of days when TN < 10th percentile : Let TNij be the daily minimum temperature on day i in period j and let TNin10 be the calendar day 10th percentile centred on a 5-day window for the base period 1961-1990. The percentage of time for the base period is determined where: TNij < TNin10 ";
                      }else if(x==1&&y=='tx10p'){
                        chart_clim(data,"Percentage",' Percentage of days when TX < 10th percentile');
                        document.getElementById("des_map").innerHTML = "Percentage of days when TX < 10th percentile : Let TXij be the daily maximum temperature on day i in period j and let TXin10 be the calendar day 10th percentile centred on a 5-day window for the base period 1961-1990. The percentage of time for the base period is determined where: TXij < TXin10 ";
                      }else if(x==1&&y=='tn90p'){
                        chart_clim(data,"Percentage",' Percentage of days when TN > 90th percentile');
                        document.getElementById("des_map").innerHTML = "Percentage of days when TN > 90th percentile : Let TNij be the daily minimum temperature on day i in period j and let TNin90 be the calendar day 90th percentile centred on a 5-day window for the base period 1961-1990. The percentage of time for the base period is determined where: TNij > TNin90 ";
                      }else if(x==1&&y=='tx90p'){
                        chart_clim(data,"Percentage",' Percentage of days when TX > 90th percentile');
                        document.getElementById("des_map").innerHTML = "Percentage of days when TX > 90th percentile : Let TXij be the daily maximum temperature on day i in period j and let TXin90 be the calendar day 90th percentile centred on a 5-day window for the base period 1961-1990. The percentage of time for the base period is determined where: TXij > TXin90 ";
                      }else if(x==2&&y=='rx1day'){
                        chart_clim(data," Precip(mm)",' Monthly maximum 1-day precipitation');
                        document.getElementById("des_map").innerHTML = "Monthly maximum 1-day precipitation:Let RRij be the daily precipitation amount on day i in period j. The maximum 1-day value for period j are: Rx1dayj = max (RRij) ";
                      }else if(x==2&&y=='rx5day'){
                        chart_clim(data," Precip(mm)",'   Monthly maximum consecutive 5-day precipitation');
                        document.getElementById("des_map").innerHTML = "Monthly maximum consecutive 5-day precipitation: Let RRkj be the precipitation amount for the 5-day interval ending k, period j.Then maximum 5-day values for period j are: Rx5dayj = max (RRkj) ";
                      }else if(x==1&&y=='su'){
                        chart_clim(data,"days",' Number of summer days');
                        document.getElementById("des_map").innerHTML = "Number of summer days: Annual count of days when TX (daily maximum temperature) > 25 Celsius.Let TXij be daily maximum temperature on day i in year j. Count the number of days where:TXij > 25 Celsius.";
                      }else if(x==1&&y=='fd'){
                        chart_clim(data,"days",' Number of frost days');
                        document.getElementById("des_map").innerHTML = "Number of frost days: Annual count of days when TN (daily minimum temperature) < 0 Celsius.Let TNijbe daily minimum temperature on day i in year j. Count the number of days where:TNij < 0 Celsius.";
                      }else if(x==1&&y=='id'){
                        chart_clim(data,"days",' Number of icing days');
                        document.getElementById("des_map").innerHTML = "Number of icing days: Annual count of days when TX (daily maximum temperature) < 0 Celsius.Let TXijbe daily maximum temperature on day i in year j. Count the number of days where:TXij < 0 Celsius.";
                      }else if(x==1&&y=='tr'){
                        chart_clim(data,"days",' Number of tropical nights');
                        document.getElementById("des_map").innerHTML = "Number of tropical nights: Annual count of days when TN (daily minimum temperature) > 20 Celsius.Let TNijbe daily minimum temperature on day i in year j. Count the number of days where:TNij > 20 Celsius.";
                      }else if(x==1&&y=='gsl'){
                        chart_clim(data,"days",' Growing season length');
                        document.getElementById("des_map").innerHTML = "Growing season length: Annual (1st Jan to 31st Dec in Northern Hemisphere (NH), 1st July to 30th June in Southern Hemisphere (SH)) count between first span of at least 6 days with daily mean temperature TG>5 Celsius and first span after July 1st (Jan 1st in SH) of 6 days with TG<5 Celsius.Let TGij be daily mean temperature on day i in year j.Count the number of days between the first occurrence of at least 6 consecutive days with:TGij > 5 Celsius. and the first occurrence after 1st July (1st Jan. in SH) of at least 6 consecutive days with:TGij < 5 Celsius.  ";
                      }else if(x==1&&y=='wsdi'){
                        chart_clim(data,"days",' Warm spell duration index');
                        document.getElementById("des_map").innerHTML = "Warm spell duration index: Annual count of days with at least 6 consecutive days when TX > 90th percentile Let TXij be the daily maximum temperature on day i in period j and let TXin90 be the calendar day 90th percentile centred on a 5-day window for the base period 1961-1990. Then the number of days per period is summed where, in intervals of at least 6 consecutive days: TXij > TXin90 ";
                      }else if(x==1&&y=='csdi'){
                        chart_clim(data,"days",' Cold spell duration index');
                        document.getElementById("des_map").innerHTML = "Cold spell duration index: Annual count of days with at least 6 consecutive days when TN < 10th percentile Let TNij be the daily maximum temperature on day i in period j and let TNin10 be the calendar day 10th percentile centred on a 5-day window for the base period 1961-1990. Then the number of days per period is summed where, in intervals of at least 6 consecutive days: TNij < TNin10 ";
                      }else if(x==1&&y=='dtr'){
                        chart_clim(data,"Temperature (°C)",' Daily temperature range');
                        document.getElementById("des_map").innerHTML = "Daily temperature range: Monthly mean difference between TX and TN Let TXij and TNij be the daily maximum and minimum temperature respectively on day i in period j.  If I represents the number of days in j, then: DTR = sum(TXij - TNij)/ I";
                      }else if(x==2&&y=='sdii'){
                        chart_clim(data,"mm/day",' Simple precipitation intensity index');
                        document.getElementById("des_map").innerHTML = "Simple pricipitation intensity index: Let RRwj be the daily precipitation amount on wet days, w (RR ≥ 1mm) in period j. If W represents number of wet days in j, then: sdii = sum(RR)/w";
                      }else if(x==2&&y=='r10mm'){
                        chart_clim(data,"days",' Annual count of days when PRCP ≥ 10mm');
                        document.getElementById("des_map").innerHTML = "Annual count of days when PRCP≥ 10mm: Let RRij be the daily precipitation amount on day i in period j. Count the number of days where: RRij ≥ 10mm ";
                      }else if(x==2&&y=='r20mm'){
                        chart_clim(data,"days",' Annual count of days when PRCP ≥ 20mm');
                        document.getElementById("des_map").innerHTML = "Annual count of days when PRCP≥ 20mm: Let RRij be the daily precipitation amount on day i in period j. Count the number of days where: RRij ≥ 20mm ";
                      }else if(x==2&&y=='rnnmm'){
                        chart_clim(data,"days",' Annual count of days when PRCP ≥ nnmm');
                        document.getElementById("des_map").innerHTML = "Annual count of days when PRCP≥ nnmm, nn is a user defined threshold: Let RRij be the daily precipitation amount on day i in period j. Count the number of days where: RRij ≥ nnmm ";
                      }else if(x==2&&y=='cdd'){
                        chart_clim(data,"days",' Maximum length of dry spell');
                        document.getElementById("des_map").innerHTML = "Maximum length of dry spell, maximum number of consecutive days with RR < 1mm: Let RRij be the daily precipitation amount on day i in period j. Count the largest number of consecutive days where: RRij < 1mm ";
                      }else if(x==2&&y=='cwd'){
                        chart_clim(data,"days",' Maximum length of wet spell');
                        document.getElementById("des_map").innerHTML = "Maximum length of wet spell, maximum number of consecutive days with RR ≥ 1mm: Let RRij be the daily precipitation amount on day i in period j. Count the largest number of consecutive days where: RRij ≥ 1mm ";
                      }else if(x==2&&y=='r95ptot'){
                        chart_clim(data,"Precip(mm)",' Annual total PRCP when RR > 95p');
                        document.getElementById("des_map").innerHTML = "Annual total PRCP when RR > 95p. Let RRwj be the daily precipitation amount on a wet day w (RR ≥ 1.0mm) in period i and let RRwn95 be the 95th percentile of precipitation on wet days in the 1961-1990 period. If W represents the number of wet days in the period, then: R95pj = sum(RRwj) where RRwj > RRwn95";
                      }else if(x==2&&y=='r99ptot'){
                        chart_clim(data,"Precip(mm)",' Annual total PRCP when RR > 99p');
                        document.getElementById("des_map").innerHTML = "Annual total PRCP when RR > 99p: Let RRwj be the daily precipitation amount on a wet day w (RR ≥ 1.0mm) in period i and let RRwn99 be the 99th percentile of precipitation on wet days in the 1961-1990 period. If W represents the number of wet days in the period, then: R99pj = sum(RRwj) where RRwj > RRwn99";
                      }else if(x==2&&y=='prcptot'){
                        chart_clim(data,"Precip(mm)",' Annual total precipitation in wet days');
                        document.getElementById("des_map").innerHTML = "Annual total precipitation in wet days: Let RRij be the daily precipitation amount on day i in period j. If I represents the number of days in j, then : prcptot = sum(RRij)";
                      }else if(x==1&&y=='max'){
                        chart_clim(data,"Celsius",' Maximum Temperature');
                        document.getElementById("des_map").innerHTML = "maximum temperature";
                      }else if(x==1&&y=='min'){
                        chart_clim(data,"Celsius",' Minimum Temperature');
                        document.getElementById("des_map").innerHTML = "minimum temperature";
                      }else if(x==1&&y=='avg'){
                        chart_clim(data,"Celsius",' Average Temperature');
                        document.getElementById("des_map").innerHTML = "Average temperature";
                      }else if(x==2&&y=='max'){
                        chart_clim(data,"Precip(mm)",' Maximum precipitation');
                        document.getElementById("des_map").innerHTML = "maximum precipitation";
                      }else if(x==2&&y=='min'){
                        chart_clim(data,"Precip(mm)",' Minimum precipitation');
                        document.getElementById("des_map").innerHTML = "minimum precipitation";
                      }else if(x==2&&y=='avg'){
                        chart_clim(data,"Precip(mm)",' Average precipitation');
                        document.getElementById("des_map").innerHTML = "Average precipitation";
                      };
          }
        //var su = {{SU|safe}}
        //chart_clim(su,"days",' Number of summer days');
        //document.getElementById("des_map").innerHTML = "Number of summer days: Annual count of days when TX (daily maximum temperature) > 25 Celsius.Let TXij be daily maximum temperature on day i in year j. Count the number of days where: TXij > 25 Celsius.";
      
        $( "select" ).change(function (e) {
              e.preventDefault();
              var csrftoken = getCookie('csrftoken');
              //label1Visible()
              var index = $("#cindex").val();
              var variable = $( "#vars" ).val();
              var ind = carsAndModels[variable][index];
              //document.getElementById("tool").innerHTML = ind;

              $.ajax({
                     url : window.location.href, // the endpoint,commonly same url
                     type : "POST", // http method
                     data : { csrfmiddlewaretoken : csrftoken, 
                     path_file : ind+''+variable
                   }, // data sent with the post request

                   // handle a successful response
                   success : function(json) {
                        console.log(json); // another sanity check
                        //On success show the data posted to server as
                                 data(json['path_file'],ind,variable);
                                    //alert('Hi '+json['path_file']);
                   },

                   // handle a non-successful response
                   error : function(xhr,errmsg,err) {
                        console.log(xhr.status + ": " + xhr.responseText); // provide a bit more info about the error to the console
                   }
               });
             
        });
[]
      function start(){
         ChangeCarList();
         var index = $("#cindex").val();
         if($("#cindex").val() == 0){
             data(maxts_data,'max',temp);
         }
        
         
      }
    start();
  
        var customTimeFormat = d3.time.format.multi([
            [".%L", function(d) { return d.getMilliseconds(); }],
            [":%S", function(d) { return d.getSeconds(); }],
            ["%I:%M", function(d) { return d.getMinutes(); }],
            ["%I %p", function(d) { return d.getHours(); }],
            ["%a %d", function(d) { return d.getDay() && d.getDate() != 1; }],
            ["%b %d", function(d) { return d.getDate() != 1; }],
            ["%b", function(d) { return d.getMonth(); }],
            ["%Y", function() { return true; }]
        ]);
         
         var win_width = window.innerWidth;

        function chart_clim(data_plot,name,ind) {
              chart(data_plot,name,ind);
          /*$(window).resize(function() {
              chart(data_plot,name,ind);
          });*/
         
              
        }
        function chart_clim_u(data_plot,name,ind) {
        	   document.getElementById("GraphName").innerHTML=ind;
             d3.select("#map").selectAll("svg").remove();
             //d3.select("#map2").selectAll("svg").remove();
             d3.select("#map3").selectAll("svg").remove();
            //document.getElementById("map_p").innerHTML = window.innerWidth;
            
            //var grap_2 = document.getElementById( "map2" );
            //grap_2.style.backgroundColor = "#FFFFFF";
            //grap_2.style.border = "none";

            var parseD = d3.time.format("%Y").parse;
            var data = data_plot.map(function(d) {
               //document.getElementById("demo").innerHTML = d[0];
               return {
                  date: parseD(d[0]),
                  close: d[1]
               };
              
             });
           
            var breakPoint = 930;


            var margin = {},margin2 = {};

            margin.top = 30;
            margin.bottom = 40;
            margin.right =  40;
            margin.left =40;

            margin2 = {top: 30, right: 20, bottom: 30, left: 20};
                 

            //var width_size = (window.innerWidth/3);
                 
            var width =$('#map').width() - margin.left - margin.right;
            var height = $('#map').height()-margin.top - margin.bottom;

            var width2 = $('#map3').width() - margin2.left - margin2.right;
            var height2 = $('#map3').height() - margin2.top - margin2.bottom;
          
            
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var x2 = d3.time.scale()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([0, width2]);

            var y2 = d3.scale.linear().range([height2, 0]);
            var xAxis2 = d3.svg.axis().scale(x2).orient("bottom");
          
            var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%Y"));

            var scale_brush = 5;

            /*if(window.innerWidth <= 1109 && window.innerWidth > 937 ) {
              xAxis.ticks(d3.time.years, 15)
              scale_brush = 15;
            }
            else if( window.innerWidth <= 937){
              xAxis.ticks(d3.time.years, 20)
              scale_brush = 20;
            }else {
              xAxis.ticks(d3.time.years, 10)
              scale_brush = 10;
            }*/


            var yAxis = d3.svg.axis().scale(y).orient(window.innerWidth < breakPoint ? 'right' : 'left');

            var brush = d3.svg.brush()
            .x(x2)
            .extent(d3.extent(data, function(d) { return d.date; }))
            .on("brushend", brushended);

            var line = d3.svg.line()
                //.interpolate("basis")
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.close); });

            var line2 = d3.svg.line()
                //.interpolate("basis")
                .x(function(d) { return x2(d.date); })
                .y(function(d) { return y2(d.close); });


            var svg = d3.select("#map").append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom);

            var svg2 = d3.select("#map3").append("svg")
             .attr("width", width2 + margin2.left + margin2.right)
             .attr("height", height2 + margin2.top + margin2.bottom);

            svg.append("defs").append("clipPath")
             .attr("id", "clip")
             .append("rect")
             .attr("width", width2)
             .attr("height", height);

            var zoom = d3.behavior.zoom().on("zoom", draw);

           /* var rect = svg.append("svg:rect")
              .attr("class", "pane")
              .attr("id", "clip-rect")
              .attr("width", width)
              .attr("height", height)
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .call(zoom);*/
            
            

            var focus = svg.append("g")
             .attr("class", "focus")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
           
            var context = svg2.append("g")
             .attr("class", "context")
             .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
          
            var clip2 = focus.append("defs").append("svg:clipPath")
    			.attr("id", "clip2")
    			.append("svg:rect")
    			.attr("id", "clip-rect")
    			.attr("x", "0")
    			.attr("y", "0")
    			.attr("width", width)
    			.attr("height", height);
                    
             
             x.domain(d3.extent(data, function(d) { return d.date; }));
             y.domain(d3.extent(data, function(d) { return d.close; }));

             x2.domain(x.domain());
             y2.domain(y.domain());

            focus.append("path")
              .datum(data)
              .attr("class", "line")
              .attr("d", line(data))
              .attr("clip-path","url(#clip2)");

            focus.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis);

            focus.append("g")
               .attr("class", "y axis")
               .call(yAxis);

            /*focus.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 2.5)
                .style("fill", "#005580")    
                .style("opacity", .8)      // set the element opacity
                .style("stroke", "#f93")    // set the line colour
                .style("stroke-width", 0.5) 
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.close); });*/

            focus.append("text")
               //.attr("transform", "rotate(-90)")
               .attr("x", 1)
               .attr("y",-12 )
               .style("font-family", "sans-serif")
               .style("fill", "#e60000")
               .style("text-anchor", "middle")
               .text(name);

            focus.append("text")
               .attr("x", width+20)
               .attr("y", height+5 )
               .style("font-family", "sans-serif")
               .style("fill", "#e60000")
               .style("text-anchor", "middle")
               .text("Years");

            /*focus.append("text")
               .attr("x", (width/2)+8)
               .attr("y", -12 )
               .style("fill", "#000033")
               .style("font-family", "sans-serif")
               .style("text-anchor", "middle")
               .attr("font-size", "11px")
               .text(ind);*/

            context.append("g")
             .attr("class", "x grid")
             .attr("transform", "translate(0," + height2 + ")")
             .call(d3.svg.axis()
                .scale(x2)
                .orient("bottom")
                .ticks(d3.time.years, 5)
                .tickSize(-height2)
                .tickFormat(""))
             .selectAll(".tick")
             .classed("minor", function(d) { return d.getHours(); });

            context.append("path")
              //.datum(data)
              .attr("class", "brush");
              //.attr("d", line2(data));
            
            context.append("text")
               .attr("x", (width2/2)+8)
               .attr("y", -12 )
               .attr("class", "caption")
               .text("Years")

            context.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height2 + ")")
             .call(d3.svg.axis()
               .scale(x2)
               .orient("bottom")
               .ticks(d3.time.years,scale_brush)
               .tickPadding(0))
             .selectAll("text")
             .attr("x", 6)
             .style("font-size","8px")
             .style("font-family", "sans-serif")
             .style("text-anchor", "middle")
             .call(xAxis2);

           context.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.event)
            .selectAll("rect")
            .style("fill", "red")
            .attr("height", height2);

          function brushended() {
           
            var extent0 = brush.extent(),
                extent1 = extent0.map(d3.time.year.round);
                //cal_year(extent1,data_plot,ind,name);
         
            if (!d3.event.sourceEvent){
                //cal_year(extent1,data_plot,ind,name);
              /*focus.append("text")
               .attr("x", (width/2) )
               .attr("y", -10 )
               .style("fill", "#000033")
               .style("font-family", "sans-serif")
               .style("text-anchor", "middle")
               .attr("font-size", "13px")
               .text(ind+" in"+extent1[0].getFullYear()+"-"+extent1[1].getFullYear());*/
             
          return;
            } // only transition after input

            // if empty when rounded, use floor & ceil instead
            if (extent1[0] >= extent1[1]) {
                extent1[0] = d3.time.year.floor(extent0[0]);
                extent1[1] = d3.time.year.ceil(extent0[1]);
             }
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            
            d3.select(this).transition()
              .call(brush.extent(extent1))
              .call(brush.event)
              .call(endAll, function () {
               
              });
             
            zoom.x(x);
          }

          function endAll (transition, callback) {
            var n;

            if (transition.empty()) {
                callback();
            }
            else {
                n = transition.size();
                transition.each("end", function () {
                    n--;
                    focus.select(".x.axis").call(xAxis);
                    if (n === 0) {
                        focus.select(".line").attr("d", line(data));
                        //focus.select(".dot");
                        callback();
                    }
                });
            }
          }
          function draw() {
          }

        }
       

        function chart_cal(data_plot,name,ind) {
             var cnt_x = [];
             var cnt_x_sq = [];
             var val = [];
             var year2 = [];
             var xy = [];
                  //var mss = data[0];
              data_plot.forEach(function(d,i) {
                  val[i] = d[1];
                  year2[i] = d[0];
                  cnt_x[i] = i;
                  cnt_x_sq[i] = i*i; 
                  xy[i]=d[1]*i;
              });
              var n = cnt_x.length
              var sumX = cnt_x.reduce(function(a, b) { return a + b; }, 0);
              var sumY = val.reduce(function(a, b) { return a + b; }, 0);
              var sumXsquare =cnt_x_sq.reduce(function(a, b) { return a+b; }, 0);
              var sumXY = xy.reduce(function(a, b) { return a+b; }, 0);

              var b = ( (n*sumXY) - (sumX*sumY) ) / ( (n*sumXsquare)  - (sumX*sumX) )

              var a = ( 1/n )*( sumY- (b*sumX) )



              document.getElementById("map").innerHTML = b;

        }

        function leastSquares(x, y) {
              
              var lr = {};
              var n = y.length;
              var sum_x = 0;
              var sum_y = 0;
              var sum_xy = 0;
              var sum_xx = 0;
              var sum_yy = 0;

              for (var i = 0; i < y.length; i++) {

                  sum_x += x[i];
                  sum_y += y[i];
                  sum_xy += (x[i]*y[i]);
                  sum_xx += (x[i]*x[i]);
                  sum_yy += (y[i]*y[i]);
              } 

              lr['slope'] = (n * sum_xy - sum_x * sum_y) / (n*sum_xx - sum_x * sum_x);
              lr['intercept'] = (sum_y - lr.slope * sum_x)/n;
              lr['r2'] = Math.pow((n*sum_xy - sum_x*sum_y)/Math.sqrt((n*sum_xx-sum_x*sum_x)*(n*sum_yy-sum_y*sum_y)),2);

              return lr;
        }

       function ch(data_plot,name,ind) {
            
            var xLabels = data_plot.map(function (d) { return d[0]; })
            
            
            var xSeries = d3.range(1, xLabels.length + 1);
            var ySeries = data_plot.map(function(d) { return parseFloat(d[1]); });
            
            //var leastSquaresCoeff = leastSquares(xSeries, ySeries);

            // apply the reults of the least squares regression
            var x1 = xLabels[0];
            var y1 = leastSquaresCoeff[0] + leastSquaresCoeff[1];
            var x2 = xLabels[xLabels.length - 1];
            var y2 = leastSquaresCoeff[0] * xSeries.length + leastSquaresCoeff[1];
            var trendData = [[x1,y1,x2,y2]];

            var trendline = svg.selectAll(".trendline").data(trendData);
      
            trendline.enter()
              .append("line")
              .attr("class", "trendline")
              .attr("x1", function(d) { return xScale(d[0]); })
              .attr("y1", function(d) { return yScale(d[1]); })
              .attr("x2", function(d) { return xScale(d[2]); })
              .attr("y2", function(d) { return yScale(d[3]); })
              .attr("stroke", "black")
              .attr("stroke-width", 1);
            
            document.getElementById("map").innerHTML = ySeries;


        }

function chart(data_plot,name,ind) {

             document.getElementById("GraphName").innerHTML=ind;
             d3.select("#map").selectAll("svg").remove();
             //d3.select("#map2").selectAll("svg").remove();
             d3.select("#map3").selectAll("svg").remove();
            //document.getElementById("map_p").innerHTML = window.innerWidth;
            
            //var grap_2 = document.getElementById( "map2" );
            //grap_2.style.backgroundColor = "#FFFFFF";
            //grap_2.style.border = "none";

            var parseD = d3.time.format("%Y").parse;
            var data = data_plot.map(function(d) {
               //document.getElementById("demo").innerHTML = d[0];
               return {
                  date: parseD(d[0]),
                  close: d[1]
               };
              
             });
          
            var ind_data = [];
            //var mss = data[0];
            data_plot.forEach(function(d,i) {
                ind_data[i] = d[1];
            });
 
            //document.getElementById("GraphName").innerHTML=Math.max.apply(null,ind_data);
            var str_color = Math.min.apply(null,ind_data)
            var end_color = Math.max.apply(null,ind_data)

            var breakPoint = 930;


            var margin = {},margin2 = {};

            margin.top = 30;
            margin.bottom = 40;
            margin.right =  40;
            margin.left =40;

            margin2 = {top: 30, right: 20, bottom: 30, left: 20};
                 

            //var width_size = (window.innerWidth/3);
                 
            var width =$('#map').width() - margin.left - margin.right;
            var height = $('#map').height()-margin.top - margin.bottom;

            var width2 = $('#map3').width() - margin2.left - margin2.right;
            var height2 = $('#map3').height() - margin2.top - margin2.bottom;
          
            
            var x = d3.time.scale().range([0, width]);
            var y = d3.scale.linear().range([height, 0]);

            var x2 = d3.time.scale()
            .domain(d3.extent(data, function(d) { return d.date; }))
            .range([0, width2]);

            var y2 = d3.scale.linear().range([height2, 0]);
            var xAxis2 = d3.svg.axis().scale(x2).orient("bottom");
          
            var xAxis = d3.svg.axis().scale(x).orient("bottom").tickFormat(d3.time.format("%Y"));
            xAxis.ticks(d3.time.years, 5) //for 10 years

            var scale_brush = 5; //100 year use 5 it 1 for 10 years
            
            /*if(window.innerWidth <= 1109 && window.innerWidth > 937 ) {
              xAxis.ticks(d3.time.years, 15)
              scale_brush = 15;
            }
            else if( window.innerWidth <= 937){
              xAxis.ticks(d3.time.years, 20)
              scale_brush = 20;
            }else {
              xAxis.ticks(d3.time.years, 10)
              scale_brush = 10;
            }*/


            //var yAxis = d3.svg.axis().scale(y).orient(window.innerWidth < breakPoint ? 'right' : 'left');
            var yAxis = d3.svg.axis().scale(y).orient("left");//auto // for scle use ".ticks(6)"

            var brush = d3.svg.brush()
            .x(x2)
            .extent(d3.extent(data, function(d) { return d.date; }))
            .on("brushend", brushended);

            var line = d3.svg.line()
                //.interpolate("basis")
                .x(function(d) { return x(d.date); })
                .y(function(d) { return y(d.close); });

            var line2 = d3.svg.line()
                //.interpolate("basis")
                .x(function(d) { return x2(d.date); })
                .y(function(d) { return y2(d.close); });


            var svg = d3.select("#map").append("svg")
             .attr("width", width + margin.left + margin.right)
             .attr("height", height + margin.top + margin.bottom);

            var svg2 = d3.select("#map3").append("svg")
             .attr("width", width2 + margin2.left + margin2.right)
             .attr("height", height2 + margin2.top + margin2.bottom);

            svg.append("defs").append("clipPath")
             .attr("id", "clip")
             .append("rect")
             .attr("width", width2)
             .attr("height", height);

            var zoom = d3.behavior.zoom().on("zoom", draw);

           /* var rect = svg.append("svg:rect")
              .attr("class", "pane")
              .attr("id", "clip-rect")
              .attr("width", width)
              .attr("height", height)
              .attr("transform", "translate(" + margin.left + "," + margin.top + ")")
              .call(zoom);*/
             
            

            var focus = svg.append("g")
             .attr("class", "focus")
             .attr("transform", "translate(" + margin.left + "," + margin.top + ")");
           
            var context = svg2.append("g")
             .attr("class", "context")
             .attr("transform", "translate(" + margin2.left + "," + margin2.top + ")");
          
            var clip2 = focus.append("defs").append("svg:clipPath")
              .attr("id", "clip2")
              .append("svg:rect")
              .attr("id", "clip-rect")
              .attr("x", "0")
              .attr("y", "0")
              .attr("width", width)
              .attr("height", height);
                    
             
             x.domain(d3.extent(data, function(d) { return d.date; }));
             y.domain(d3.extent(data, function(d) { return d.close; }));

             x2.domain(x.domain());
             y2.domain(y.domain());

             var transition = d3.transition();

             var col = ["#4575b4","#ffffbf","#a50026"]
             var dom = [-10,20,35]

             var clo_1 = dom.reduce(function (prev, curr) {
               return (Math.abs(curr - str_color) < Math.abs(prev - str_color) ? curr : prev);
             });
             var clo_2 = dom.reduce(function (prev, curr) {
               return (Math.abs(curr - end_color) < Math.abs(prev - end_color) ? curr : prev);
             });

             ind_str = 0;
             ind_end = 1;

             for (var i = 0; i  < dom.length ; i++) {
                  if (clo_1 == dom[i]) {ind_str = i;};
                  if (clo_2 == dom[i]) {ind_end = i;};
             };
             
             //document.getElementById("GraphName").innerHTML= ind_str + ":" + ind_end;
             svg.append("linearGradient")
                .attr("id", "temperature-gradient")
                .attr("gradientUnits", "userSpaceOnUse")
                .attr("x1", 0).attr("y1", y(str_color))
                .attr("x2", 0).attr("y2", y(end_color))
              .selectAll("stop")
                .data([
                  {offset: "0%", color: col[ind_str]},
                  {offset: "100%", color: col[ind_end]}
                ])
              .enter().append("stop")
                .attr("offset", function(d) { return d.offset; })
                .attr("stop-color", function(d) { return d.color; });


            focus.append("path")
              .datum(data)
              .attr({
                'class':'line',
                'd': line(data),
              })
              .each(function(d) { d.totalLength = this.getTotalLength(); })
              .attr("stroke-dasharray", function(d) { return d.totalLength + " " + d.totalLength; })
              .attr("stroke-dashoffset", function(d) { return d.totalLength; })
              .transition()
                  .delay( 3000 )
                  .duration(1500)
              .attr('stroke-dashoffset', 0)
              .attr("clip-path","url(#clip2)");

            focus.append("g")
               .attr("class", "x axis")
               .attr("transform", "translate(0," + height + ")")
               .call(xAxis);

            focus.append("g")
               .attr("class", "y axis")
               .call(yAxis);

            /*focus.selectAll("dot")
                .data(data)
                .enter().append("circle")
                .attr("r", 2.5)
                .style("fill", "#005580")    
                .style("opacity", .8)      // set the element opacity
                .style("stroke", "#f93")    // set the line colour
                .style("stroke-width", 0.5) 
                .attr("cx", function(d) { return x(d.date); })
                .attr("cy", function(d) { return y(d.close); });*/

            focus.append("text")
               //.attr("transform", "rotate(-90)")
               .attr("x", 1)
               .attr("y",-12 )
               .style("font-family", "sans-serif")
               .style("fill", "black")
               .style("font-size","8px")
               .style("text-anchor", "middle")
               .text(name);

            focus.append("text")
               .attr("x", width+20)
               .attr("y", height+5 )
               .style("font-family", "sans-serif")
               .style("fill", "black")
               .style("font-size","8px")
               .style("text-anchor", "middle")
               .text("Years");

            /*focus.append("text")
               .attr("x", (width/2)+8)
               .attr("y", -12 )
               .style("fill", "#000033")
               .style("font-family", "sans-serif")
               .style("text-anchor", "middle")
               .attr("font-size", "11px")
               .text(ind);*/

            context.append("g")
             .attr("class", "x grid")
             .attr("transform", "translate(0," + height2 + ")")
             .call(d3.svg.axis()
                .scale(x2)
                .orient("bottom")
                .ticks(d3.time.years, 5)
                .tickSize(-height2)
                .tickFormat(""))
             .selectAll(".tick")
             .classed("minor", function(d) { return d.getHours(); });

            context.append("path")
              //.datum(data)
              .attr("class", "brush");
              //.attr("d", line2(data));
            
            context.append("text")
               .attr("x", (width2/2)+8)
               .attr("y", -12 )
               .attr("class", "caption")
               .text("Years")

            context.append("g")
             .attr("class", "x axis")
             .attr("transform", "translate(0," + height2 + ")")
             .call(d3.svg.axis()
               .scale(x2)
               .orient("bottom")
               .ticks(d3.time.years,scale_brush)
               .tickPadding(0))
             .selectAll("text")
             .attr("x", 6)
             .style("font-size","8px")
             .style("font-family", "sans-serif")
             .style("text-anchor", "middle")
             .call(xAxis2);

           context.append("g")
            .attr("class", "brush")
            .call(brush)
            .call(brush.event)
            .selectAll("rect")
            .style("fill", "black")
            .attr("height", height2);
/*var transition = d3.transition();

var path = svg.append('path')
  .datum(data)
    .attr({
      'd': line(data),
      'stroke-dasharray': '385 385',
      'stroke-dashoffset': 385
    })
    .transition()
        .delay( 2000 )
        .duration(1500)
    .attr('stroke-dashoffset', 0)*/


    function brushended() {
           
            var extent0 = brush.extent(),
                extent1 = extent0.map(d3.time.year.round);
                //cal_year(extent1,data_plot,ind,name);
         
            if (!d3.event.sourceEvent){
                //cal_year(extent1,data_plot,ind,name);
              /*focus.append("text")
               .attr("x", (width/2) )
               .attr("y", -10 )
               .style("fill", "#000033")
               .style("font-family", "sans-serif")
               .style("text-anchor", "middle")
               .attr("font-size", "13px")
               .text(ind+" in"+extent1[0].getFullYear()+"-"+extent1[1].getFullYear());*/
             
          return;
            } // only transition after input

            // if empty when rounded, use floor & ceil instead
            if (extent1[0] >= extent1[1]) {
                extent1[0] = d3.time.year.floor(extent0[0]);
                extent1[1] = d3.time.year.ceil(extent0[1]);
             }
            x.domain(brush.empty() ? x2.domain() : brush.extent());
            
            d3.select(this).transition()
              .call(brush.extent(extent1))
              .call(brush.event)
              .call(endAll, function () {
               
              });
             
            zoom.x(x);
          }

          function endAll (transition, callback) {
            var n;

            if (transition.empty()) {
                callback();
            }
            else {
                n = transition.size();
                transition.each("end", function () {
                    n--;
                    focus.select(".x.axis").call(xAxis);
                    if (n === 0) {
                        focus.select(".line").attr("d", line(data));
                        //focus.select(".dot");
                        callback();
                    }
                });
            }
          }
          function draw() {
          }
}
