// ws://192.168.43.186:9090

var app = new Vue({
    el: '#app',
    // storing the state of the page
    data: {
        connected: false,
        ros: null,
        ros2: null,
        ws_address: 'ws://192.168.43.186:9090',
        logs: [],
        loading: false,
        loadingmode1: false,
        loadingmode2: false,
        loadingmode3: false,
        mod: null,
        topic: null,
        topic2: null,
        message: null,
        message2: null
    },

    //helper methods to connect to ROS
    methods: {
        connect: function () {
            console.log('Connect to rosbridge server!!')
            this.logs.unshift('Connect to rosbridge server!!')

            this.loading = true
            this.ros = new ROSLIB.Ros({
                url: this.ws_address
            })


            this.ros.on('connection', () => {
                this.connected = true
                this.loading = false

                console.log('Connected')
                this.logs.unshift((new Date()).toTimeString() + ' - Connected')
            })


            this.ros.on('error', (error) => {
                console.log('Error connecting to websocket server: ', error)
                this.logs.unshift('Error connecting to websocket server')
            })


            this.ros.on('close', () => {
                this.connected = false
                this.loading = false
                console.log('Connection to websocket server closed.')
                this.logs.unshift('Connection to websocket server closed')
            })
        },

        disconnect: function () {
            this.ros.close()
        },

        setTopic: function () {
            this.topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist'
            })
        },

        setTopic2: function () {
            this.topic = new ROSLIB.Topic({
                ros: this.ros2,
                name: '/mode_robot',
                messageType: 'geometry_msgs/Twist'
            })
        },

        forward: function () {
            this.message = new ROSLIB.Message({
                linear: {
                    x: 1,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        stop: function () {
            this.message = new ROSLIB.Message({
                linear: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        backward: function () {
            this.message = new ROSLIB.Message({
                linear: {
                    x: -1,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: 0,
                },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        turnLeft: function () {
            this.message = new ROSLIB.Message({
                linear: {
                    x: 0.5,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: 0.5,
                },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        turnRight: function () {
            this.message = new ROSLIB.Message({
                linear: {
                    x: 0.5,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: -0.5,
                },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },


        mode1: function () {
            this.mod = "a"
            console.log("Mode 1 dipanggil, mod: ", this.mod)
            this.loadingmode1 = true
        },


        mode2: function () {
            this.mod = "b"
            console.log("Mode 2 dipanggil, mod: ", this.mod)
            this.loadingmode2 = true
        },

        mode3: function () {
            this.mod = "c"
            console.log("Mode 3 dipanggil, mod: ", this.mod)
            this.loadingmode3 = true

        },

        reset: function () {
            this.mod = null
            console.log("Reset dipanggil, mod: ", this.mod)
            this.loadingmode1 = false
            this.loadingmode2 = false
            this.loadingmode3 = false
        },


        start: function () {
            console.log("mod yang aktif: ", this.mod)
            this.message2 = new ROSLIB.Message({
                linear: {
                    x: 0.5,
                    y: 0,
                    z: 0,
                },
                angular: {
                    x: 0,
                    y: 0,
                    z: -0.5,
                },
            })
            this.setTopic()
            this.topic2.publish(this.message2)
        }






    },
    mounted() {},
})