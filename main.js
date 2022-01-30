// ws://192.168.43.186:9090

var app = new Vue({
    el: '#app',
    // storing the state of the page
    data: {
        connected: false,
        ros: null,
        ws_address: 'ws://192.168.43.186:9090',
        logs: [],
        loading: false,
        loading2: false,
        topic: null,
        message: null,      
    },

    //helper methods to connect to ROS
    methods: {
        connect: function() {
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
                this.logs.unshift ((new Date()).toTimeString() + ' - Connected')
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

        disconnect: function() {
            this.ros.close()
        },

        setTopic: function() {
            this.topic = new ROSLIB.Topic({
                ros: this.ros,
                name: '/cmd_vel',
                messageType: 'geometry_msgs/Twist'
            })
        },

        forward: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 1, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        stop: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 0, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        backward: function() {
            this.message = new ROSLIB.Message({
                linear: { x: -1, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        turnLeft: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 0.5, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: 0.5, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        turnRight: function() {
            this.message = new ROSLIB.Message({
                linear: { x: 0.5, y: 0, z: 0, },
                angular: { x: 0, y: 0, z: -0.5, },
            })
            this.setTopic()
            this.topic.publish(this.message)
        },

        goForward: function(){
            this.message = new ROSLIB.Message({
              linear : {
                x : 1,
                y : 0,
                z : 0
              },
              angular : {
                x : 0,
                y : 0,
                z : 0
              }
            });
            this.setTopic();
            this.topic.publish(this.message);
          },

        modeOne: function(){
            this.loading2 = true
        }



    },
    mounted() {
    },
})