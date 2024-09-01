import Header from "../components/Header";
import { Form, Button, Input, notification } from "antd";
import { ArrowLeftOutlined } from "@ant-design/icons";
import { useDispatch, useSelector } from "react-redux";
import { updatePost } from "../state/apiSlice";
import { useParams } from "react-router-dom";
import { Link } from "react-router-dom";

export default function EditPost() {
  const { id } = useParams();
  const [form] = Form.useForm();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.api.posts);
  const status = useSelector((state) => state.api.status);
//   const error = useSelector((state) => state.api.error);
  const post = posts.find((post) => post.id === parseInt(id));
  const [api, contextHolder] = notification.useNotification();

  const openNotification = (type, placement) => {
    const btn = (
      <Link to="/crud-data-app">
        <Button>Head to Post Manager</Button>
      </Link>
    );
    api[type]({
      message: "Post Updated",
      description:
        `Post ${post?.id}  has been updated. You can view it on the posts manager`,
      btn,
      placement,
    });
  };

  const handleUpdate = () => {
    form.validateFields().then((values) => {
    const updatedPost = { ...values, id: post.id };
      dispatch(updatePost(updatedPost));
      openNotification("success", "top");
    });
  };

  return (
    <>
      <Header />
      {contextHolder}
      <div className="w-full flex flex-col md:flex-row justify-center items-center md:items-start">
        <Link to={"/crud-data-app"} className="self-start mb-4 mt-12 ml-4">
          <Button className="" icon={<ArrowLeftOutlined />}>
            Back
          </Button>
        </Link>
        <div className="w-[500px] flex flex-col items-center p-12 md:mt-14">
          <p className="text-2xl text-black font-[600] pb-8">Edit Post {post?.id}</p>
          <Form
            form={form}
            layout="vertical"
            size="middle"
            className="w-[90vw] md:w-full"
            onFinish={handleUpdate}
            initialValues={post}
          >
            <Form.Item
              name="userId"
              label="UserId"
              rules={[
                {
                  required: true,
                  message: "User ID cannot be empty and must be a number",
                },
              ]}
            >
              <Input placeholder="Input User ID" />
            </Form.Item>
            <Form.Item
              name="title"
              label="Title"
              rules={[
                {
                  required: true,
                  message: "Title cannot be empty",
                },
              ]}
            >
              <Input placeholder="Input the title of the post" />
            </Form.Item>
            <Form.Item
              name="body"
              label="Content"
              rules={[
                {
                  required: true,
                  message: "Post content cannot be empty",
                },
              ]}
            >
              <Input.TextArea placeholder="Input the post content" />
            </Form.Item>
            <Form.Item>
              <Button
                type="primary"
                htmlType="submit"
                loading={status === "posting"}
              >
                Submit
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </>
  );
}
