Parse.Cloud.define("getActiveWeekOrdinal", function(request, response) {
    var now =  new Date();
    var query = new Parse.Query("Week");
 
    // Restricts to an end that is after now
    query.greaterThanOrEqualTo("end", now);
    // Restricts to a start that is before now
    query.lessThanOrEqualTo("start", now);
    query.first({
             success: function(object) {
                 if(object!=null)
                 {
                     var ordinal = object.get("ordinal");
                     if(ordinal>17) {
                        ordinal = 17;
                     }
                     response.success(ordinal);
                 } else {
                    response.success(-1);
                 }
             },
              error: function(error) {
                response.error(error);
              }
            });
});
 
Parse.Cloud.define("getServerTime", function(request, response) {
    var dateToday = new Date();
    response.success(dateToday);
});
 
 
/* Not going to work in call cases... as we may update scores after date
Parse.Cloud.beforeSave("Roster", function(request, response) {
         
         
         
    if(request.object!=null)
    {
        var week = request.object.get("week");
        if(week==null)
        {
            response.error("Week Required for Roster");
        } else {
            var startDate = week.get("start");
            var endDate = week.get("end");
            var currentDate = new Date();
            if(currentDate > startDate && currentDate < endDate)
            {
                var qbs = request.object.get("qbs");
                var rbs = request.object.get("rbs");
                var tes = request.object.get("tes");
                var wrs = request.object.get("wrs");
                if(qbs==null || qbs.length!=2)
                {
                    response.error("Incorrect Amount: Qbs. ");
                } else if(rbs==null || rbs.length!=2)
                {
                    response.error("Incorrect Amount: Rbs.");
                }else if(tes==null || tes.length!=1)
                {
                    response.error("Incorrect Amount: Tes.");
                }else if(wrs==null || wrs.length!=3)
                {
                    response.error("Incorrect Amount: Wrs.");
                } else {
                    response.success();
                }
            } else {
                response.error("Invalide Date: "+currentDate +" should be after "+startDate +" and before "+endDate);
            }
        }
    } else {
        response.error("Roster not found.");
    }
 
});*/
 
Parse.Cloud.beforeSave("PlayerPool", function(request, response) {
    if(request.object!=null)
    {
        /*
        var qbs = request.object.get("qbs");
        var rbs = request.object.get("rbs");
        var tes = request.object.get("tes");
        var wrs = request.object.get("wrs");
        if(qbs==null || qbs.length!=8)
        {
            response.error("Incorrect Amount: Qbs. ");
        } else if(rbs==null || rbs.length!=10)
        {
            response.error("Incorrect Amount: Rbs.");
        }else if(tes==null || tes.length!=6)
        {
            response.error("Incorrect Amount: Tes.");
        }else if(wrs==null || wrs.length!=10)
        {
            response.error("Incorrect Amount: Wrs.");
        } else { */
            response.success();
        //}
 
    } else {
        response.error("Pool not found.");
    }
 
});
 
Parse.Cloud.beforeSave("Week", function(request, response) {
    if(request.object!=null)
    {
        var ordinal = request.object.get("ordinal");
        if(ordinal<0 || ordinal>17){
            response.error("Ordinal out of bounds: "+ordinal);
        } else {
            var firstWeek = new Date(1442131200000);
            var weeksSince = ordinal - 1;
 
            var daysSince = weeksSince * 7;
 
            var endDate = new Date(firstWeek);
            endDate.setDate(firstWeek.getDate()+daysSince);
 
            var startDate = new Date(endDate);
            startDate.setDate(endDate.getDate() - 7);
 
            request.object.set("start", startDate);
            request.object.set("end", endDate);
 
            response.success();
        }
    } else {
        response.error("Week not found.");
    }
 
});
 
// THursday  at 18 or 6pm. Currently 11.  so 7 hours ahead.   UTC time
// Saturday Sept 13th. at 8hr
// 1442131200000
 
// today: 1449166653000