import Header from "../components/Header";
import { useParams, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { Button, Modal } from "antd";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { deletePost } from "../state/apiSlice";
import { ExclamationCircleOutlined, ArrowLeftOutlined } from "@ant-design/icons";
const { confirm } = Modal;

export default function PostDetail() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.api.posts);
  const post = posts.find((post) => post.id === parseInt(id));
  const navigate = useNavigate();

  const showConfirmDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this post?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      centered: true,
      okText: "Yes",
      okType: "danger",
      onOk() {
        handleDelete(id);
        navigate("/crud-data-app/");
      },
      onCancel() {},
    });
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  return (
    <>
      <Header />
      <div className=" flex flex-col justify-center items-center">
      <Link to={"/crud-data-app"} className="self-start mb-4 mt-12 ml-8 md:ml-24">
        <Button className="" icon={<ArrowLeftOutlined />}>
          Back
        </Button>
      </Link>
      <p className="text-2xl text-black font-[600] text-center my-8">
        Post Detail
      </p>
      </div>
      
      <div className=" text-black flex flex-col items-center">
        <div className="w-[80vw] lg:w-[800px]">
          <p className="text-lg font-[600] mb-2">
            Post ID: <span className="text-gray-600 font-normal">{id}</span>
          </p>
          <p className="text-lg font-[600] mb-2">
            User ID:{" "}
            <span className="text-gray-600 font-normal">{post?.userId}</span>
          </p>
          <p className="text-lg font-[600] mb-2">Title:</p>
          <p className="text-lg mb-4 text-gray-600 font-normal">
            {post?.title}
          </p>
          <p className="text-lg font-[600] mb-2">Content:</p>
          <p className="text-lg mb-4 text-gray-600 font-normal">{post?.body}</p>
        </div>
        <div className="w-[80vw] lg:w-[800px] flex flex-col md:flex-row">
          <Link
            to={`/crud-data-app/posts/edit-post/${post.id}`}
            className="w-full mb-4 lg:mr-4 lg:mb-0"
          >
            <Button block>Edit</Button>
          </Link>
          <Button block danger onClick={() => showConfirmDelete(post.id)}>
            Delete
          </Button>
        </div>
      </div>
    </>
  );
}
