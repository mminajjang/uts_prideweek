

RobotUtils.onService(function(ALTabletService){
    var ip = RobotUtils.robotIp;
    var uuid = 'prideweek'
    var url = "http://" + ip + "/apps/" + uuid;

    ALTabletService.showWebview(url);
});