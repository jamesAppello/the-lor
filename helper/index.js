module.exports = {
    shuffle: function(q) {
        q.split('');
        var n = q.length;

        for (var i = n - 1; i > 0; i--) {
            var rand = Math.floor(Math.random() * (i + 1));
            var temp = q[i];
            q[i] = q[rand];
            q[rand] = temp;
        }
        return q.join("");
    }
}