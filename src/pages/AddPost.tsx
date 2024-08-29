import React, {useState} from 'react';
import {
    Button,
    Form,
    Input,
    InputNumber,
    Select, Upload,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';

import { S3Client, PutObjectCommand } from "@aws-sdk/client-s3";

const states = [
    "Alabama", "Alaska", "Arizona", "Arkansas", "California", "Colorado", "Connecticut", "Delaware",
    "Florida", "Georgia", "Hawaii", "Idaho", "Illinois", "Indiana", "Iowa", "Kansas", "Kentucky",
    "Louisiana", "Maine", "Maryland", "Massachusetts", "Michigan", "Minnesota", "Mississippi",
    "Missouri", "Montana", "Nebraska", "Nevada", "New Hampshire", "New Jersey", "New Mexico",
    "New York", "North Carolina", "North Dakota", "Ohio", "Oklahoma", "Oregon", "Pennsylvania",
    "Rhode Island", "South Carolina", "South Dakota", "Tennessee", "Texas", "Utah", "Vermont",
    "Virginia", "Washington", "West Virginia", "Wisconsin", "Wyoming"
];

const props = {
    name: 'file',
    action: 'https://660d2bd96ddfa2943b33731c.mockapi.io/api/upload',
    headers: {
        authorization: 'authorization-text',
    },
    onChange(info) {
        if (info.file.status !== 'uploading') {
            console.log(info.file, info.fileList);
        }
        if (info.file.status === 'done') {
           
        } else if (info.file.status === 'error') {

        }
    },
};

const AddPost: React.FC = () => {



    const [form] = Form.useForm();
    const [images,setImages] = useState<File[]>([]);


    function handleImages ({ file}){
        setImages((prev)=>[file,...prev]);
    }

    const normFile = (e: any) => {
        console.log('Upload event:', e);
        if (Array.isArray(e)) {
            return e;
        }
        return e?.fileList;
    };

    const uploadFile = async (file) => {
        const s3Client = new S3Client({
            region: "us-east-1",
            credentials: {
                accessKeyId: process.env.REACT_APP_AWS_ACCESS_KEY_ID,
                secretAccessKey: process.env.REACT_APP_AWS_SECRET_ACCESS_KEY,
            },
        });

        const params = {
            Bucket: "karavanproducts",
            Key: file.name,
            Body: file,
        };

        try {
            await s3Client.send(new PutObjectCommand(params));
            const fileUrl = `https://${params.Bucket}.s3.${"us-east-1"}.amazonaws.com/${params.Key}`;
            console.log("File uploaded successfully.", fileUrl);
            return fileUrl;
        } catch (err) {
            console.log("Error uploading file", err);
        }
    };


    const handleSubmit = async (values: any) => {
        console.log('Form values:', values);
        let imgUrls:string[] =[];
        try {
            imgUrls = await Promise.all(images.map(uploadFile));
            console.log("Urls:", imgUrls);
        } catch (err) {
            console.log("Error uploading images:", err);
            return; // Exit the function if there's an error uploading images
        }

        console.log("Urls:",imgUrls);

        const formData = {
            title: values.title,
            cost: values.cost,
            description: values.description,
            category: values.category,
            location: values.location,
            imageUrls: imgUrls,
            createdDate : new Date().toISOString()
        };

        // Send formData to the backend
        try {
            const response = await fetch('https://localhost:7299/api/products', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(formData
                ),
            });

            if (response.ok) {
                console.log('Product added successfully');
                form.resetFields();
            } else {
                console.log('Error adding product');
            }
        } catch (error) {
            console.log('Network error:', error);
        }





    };

    return (
        <div className="w-full h-full flex justify-center p-10  ">

            <Form
                className="w-[500px] h-auto flex flex-col   "
                variant="filled"
                form={form}
                onFinish={handleSubmit}
            >
                <h1 className={"text-xl mb-4"}>Add new post</h1>
                <Form.Item name="title" rules={[{ required: true, message: 'Please input the title!' }]}>
                    <Input placeholder="Title" />
                </Form.Item>

                <Form.Item name="cost" rules={[{ required: true, message: 'Please input the cost!' }]}>
                    <InputNumber className="w-full" placeholder="Cost" />
                </Form.Item>

                <Form.Item name="description" rules={[{ required: true, message: 'Please input the description!' }]}>
                    <Input.TextArea rows={4} placeholder="Description" />
                </Form.Item>

                <Form.Item name="category" rules={[{ required: true, message: 'Please select a category!' }]}>
                    <Select placeholder="Category" className="block">
                        <Select.Option value="realty">Realty</Select.Option>
                        <Select.Option value="auto">Auto</Select.Option>
                        <Select.Option value="jobs">Jobs</Select.Option>
                        <Select.Option value="other">Other</Select.Option>
                    </Select>
                </Form.Item>

                <Form.Item name="location" rules={[{ required: true, message: 'Please select a location!' }]}>
                    <Select className="block" placeholder="Location">
                        {states.map((state) => (
                            <Select.Option key={state.toLowerCase()} value={state.toLowerCase()}>
                                {state}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    name="upload"
                    label="Upload"
                    valuePropName="fileList"
                    getValueFromEvent={normFile}
                    extra="Select a file to upload"
                >
                    <Upload {...props} customRequest={handleImages}>
                        <Button icon={<UploadOutlined />}>Click to Upload</Button>
                    </Upload>
                </Form.Item>


                    <Button className={"mb-10"} type="primary" htmlType="submit">
                        Submit
                    </Button>

            </Form>
        </div>
    );
};

export default AddPost;
