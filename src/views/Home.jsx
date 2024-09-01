import Header from "../components/Header";
import { Table, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts, deletePost } from "../state/apiSlice";
import { useEffect } from "react";
import { PlusOutlined, ExclamationCircleOutlined } from "@ant-design/icons";
import { Space, Modal, Dropdown, Menu } from "antd";
const { confirm } = Modal;
import { Link } from "react-router-dom";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";

export default function Home() {
  const dispatch = useDispatch();
  const posts = useSelector((state) => state.api.posts);
  const status = useSelector((state) => state.api.status);
  const error = useSelector((state) => state.api.error);

  useEffect(() => {
    if (status === "idle") {
      dispatch(fetchPosts());
    }
  }, [status, dispatch]);

  if (status === "failed") {
    return <div className="text-center text-2xl text-red-500">{error}</div>;
  }

  //Modal Functions
  const showConfirmDelete = (id) => {
    confirm({
      title: "Are you sure you want to delete this post?",
      icon: <ExclamationCircleOutlined />,
      content: "This action cannot be undone.",
      centered: true,
      okText: "Yes",
      okType: "danger",
      onOk() {
        console.log(status);
        handleDelete(id);
        console.log(status);
      },
      onCancel() {},
    });
  };

  const handleDelete = (id) => {
    dispatch(deletePost(id));
  };

  //Table Functions
  const columns = [
    {
      title: "Post ID",
      dataIndex: "id",
      key: "id",
      width: 80,
      align: "center",
      sorter: (a, b) => a.id - b.id,
    },
    {
      title: "User ID",
      dataIndex: "userId",
      key: "userId",
      width: 80,
      align: "center",
      sorter: (a, b) => a.userId - b.userId,
    },
    {
      title: "Title",
      dataIndex: "title",
      key: "title",
      ellipsis: true,
      align: "left",
    },
    {
      title: "Action",
      dataIndex: "action",
      key: "action",
      align: "center",
      render: (_, record) => (
        <div className="flex justify-center items-center">
          <Space size="middle" className="hidden xl:flex justify-center">
            <Link to={`/crud-data-app/posts/${record.id}`}>
              <Button>Detail</Button>
            </Link>
            <Link to={`/crud-data-app/posts/edit-post/${record.id}`}>
              <Button>Edit</Button>
            </Link>
            <Button danger onClick={() => showConfirmDelete(record.id)}>
              Delete
            </Button>
          </Space>
          <Dropdown
            className="flex xl:hidden"
            trigger={["click"]}
            overlay={
              <Menu>
                <Menu.Item key="1">
                  <Link to={`/crud-data-app/posts/${record.id}`}>Detail</Link>
                </Menu.Item>
                <Menu.Item key="2">
                  <Link to={`/crud-data-app/posts/edit-post/${record.id}`}>
                    Edit
                  </Link>
                </Menu.Item>
                <Menu.Item key="3">
                  <Button
                    danger
                    type="text"
                    onClick={() => showConfirmDelete(record.id)}
                  >
                    Delete
                  </Button>
                </Menu.Item>
              </Menu>
            }
          >
            <Button>Actions</Button>
          </Dropdown>
        </div>
      ),
    },
  ];

  //Chart Functions
  ChartJS.register(ArcElement, Tooltip, Legend);

  const postCountsByUser = posts.reduce((acc, post) => {
    acc[post.userId] = (acc[post.userId] || 0) + 1;
    return acc;
  }, {});

  const labels = Object.keys(postCountsByUser).map(
    (userId) => `User ${userId}`
  );
  const data = Object.values(postCountsByUser);

  const chartData = {
    labels: labels,
    datasets: [
      {
        label: "# of Posts",
        data: data,
        backgroundColor: [
          "#519DE9",
          "#7CC674",
          "#73C5C5",
          "#8481DD",
          "#F6D173",
          "#EF9234",
          "#A30000",
          "#D2D2D2",
          "#FFCE56",
          "#FF6384",
          "#B1AFFF",
        ],
      },
    ],
  };

  const chartOptions = {
    plugins: {
      legend: {
        position: "bottom",
      },
    },
  };

  return (
    <>
      <Header />
      <div className="w-full flex justify-center p-12">
        <div className="w-full flex flex-col items-center">
          <p className="text-2xl text-black font-[600] mb-6">Post Manager</p>

          <div className="flex flex-col lg:flex-row justify-center items-start">
            <div>
              <Link to="/crud-data-app/add-post" className="mb-4">
                <Button type="primary" icon={<PlusOutlined />}>
                  Add Post
                </Button>
              </Link>
              <Table
                dataSource={posts}
                columns={columns}
                rowKey={(post) => post.id}
                pagination={{ position: ["bottomCenter"] }}
                bordered={true}
                loading={status === "loading"}
                size="middle"
                className="w-[90vw] lg:w-[40vw] mt-4"
              ></Table>
            </div>

            <div className="w-[90vw] lg:w-[40vw] md:h-[600px] lg:ml-8 lg:mt-12 p-8 py-10 border-2 rounded-lg flex flex-col justify-center items-center">
              <p className="text-2xl text-gray-500 font-[600] mb-4">
                Post Count per User
              </p>
              <Pie data={chartData} options={chartOptions} />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
