import { Card, Form, Input, Button } from "antd"

export default function ContactUsSection() {


    const handleSubmit = (values) => {
        console.log("Form submitted:",values);
      };

  return  ( 
    <div style={pageStyle}>
  
        <div title="Contact Us" style={cardStyle}>
            
              <p style={{ textAlign: "center", marginBottom: "20px"}}>
              Have questions? Fill out the form below and we'll get back to you! 
              </p>
            

            <Form layout="vertical" onFinish={handleSubmit}>

                <Form.Item 
                label="Name" 
                name="name" 
                rules={[{ required: true, message: "Please enter your name" }]}
                >
                    <Input placeholder="Enter your full name" />
                </Form.Item>

                <Form.Item 
                    label="Email" 
                    name="email" 
                    rules={[
                        { required: true, message: "Please enter your email" },
                        { type: "email", message: "Please enter a valid email" },
                        ]}
                    >
                        <Input placeholder="Enter enter your email" />
                </Form.Item>

                <Form.Item
                    label="Message"
                    name="message"
                    rules={[{ required: true, message: "Please enter your message" }]}
                >
                    <Input.TextArea rows={4} placeholder="Type your message here..." />
                </Form.Item>

                <Form.Item>
                    <Button type="primary" htmlType="submit" block style={{background: "#48a860", color: "#fff" }}>
                    Send Message
                    </Button>
                </Form.Item>
            </Form>
        </div>

        <div>
            <img src="/img/Box.jpg" style={Box} ></img>
        </div>                



    </div> 


        );
}

const pageStyle = {
    padding: "0 200px",
    display: "flex",
    justifyContent: "left",
    alignItems: "center",
    columnGap: "100px",
    minHeight: "90vh",
    backgroundColor: "#f5f5f5",
  };

const cardStyle = {
    width: "400px",
    padding: "20px",
    borderRadius: "8px",
    backgroundColor: "#fff",
    boxShadow: "0 4px 8px rgba(0,0,0,0.1)",

};

const Box = {
    width: "500px",
}