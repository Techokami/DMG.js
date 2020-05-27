var Discord = require('discord.js')
var os = require('os')
var osutil = require('os-utils')
var osu = require('node-os-utils')

function millisecondsToStr (milliseconds) {
    function numberEnding (number) {
        return (number > 1) ? 's' : '';
    }

    var temp = Math.floor(milliseconds / 1000);
    var days = Math.floor((temp %= 31536000) / 86400);
    if (days) {
        return days + ' day' + numberEnding(days);
    }
    var hours = Math.floor((temp %= 86400) / 3600);
    if (hours) {
        return hours + ' hour' + numberEnding(hours);
    }
    var minutes = Math.floor((temp %= 3600) / 60);
    if (minutes) {
        return minutes + ' minute' + numberEnding(minutes);
    }
    var seconds = temp % 60;
    if (seconds) {
        return seconds + ' second' + numberEnding(seconds);
    }
    return 'less than a second'; //'just now' //or other string you like;
}

module.exports = {
    name: 'stats',
    aliases: ['stats'],
    description: 'Server Statistics',
    execute: function (msg, args) {
        const pcc = require('physical-cpu-count')
        const lcc = require('os').cpus().length
        const Embed = new Discord.MessageEmbed();
        var cpu = osu.cpu

        cpu.usage(1000).then(info => {
            Embed.setColor('#30f80c');
            Embed.setTitle('Server Statistics');
            Embed.addField('CPU Usage:', `${info}%`, true);
            Embed.addField('\u200B', '\u200B', true)
            Embed.addField('Ram Usage:', `${parseInt(osutil.totalmem() - osutil.freemem()).toFixed(0)}MB/${parseInt(osutil.totalmem()).toFixed(0)}MB`, true)
            Embed.addField("Cores", pcc, true)
            Embed.addField('\u200B', '\u200B', true)
            Embed.addField("Threads:", lcc, true)
            Embed.addField("Bot Uptime:", millisecondsToStr(osutil.processUptime() * 1000), true)
            Embed.addField('\u200B', '\u200B', true)
            Embed.addField("System Uptime:", millisecondsToStr(os.uptime() * 1000), true)
            msg.channel.send(Embed);
        })
    }
}