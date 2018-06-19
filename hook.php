<?php
/**
 * Created by PhpStorm.
 * User: RenZhiYuan
 * E-mail:465386466@qq.com
 * Date: 2018/6/15 0015
 * Time: 上午 10:41
 */


/*$json =  json_decode(file_get_contents('php://input'), true);*/


//这里是一个认证的token，下面我们就会设置到
/*$token = 'YUNQUDAO_Test';
print_r(sha1($token));echo '<br />';exit;
if (empty($json['token']) || $json['token'] !== $token) {
    exit('error request');
}*/

$pwd = getcwd();

$command = 'cd ' . str_replace('\\', '/\\', $pwd) . ' && D:/Git/bin/git.exe pull origin master';

echo 'start','<br />';
echo shell_exec($command),'<br />';
echo 'end';