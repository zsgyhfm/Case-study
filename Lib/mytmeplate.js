/**
 * Created by yishan on 16/12/17.
 */

/**
 * 自己封装templat id string  单个数据
 */
function bingData(id,data){
    var html = template(id,data);
    document.getElementById(id).innerHTML = html;
}
/**
 *
 * @param templateid  模板的id 用js创建的html 模板id
 * @param htmlid  html中标签的id-也就是展示数据的标签id
 * @param data    数据
 */
function bingDatas(templateid,htmlid,data){
    var html = template(templateid,data);
    document.getElementById(htmlid).innerHTML = html;
}

