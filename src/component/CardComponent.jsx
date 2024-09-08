import { Card, Avatar, Modal,FloatButton } from "antd";
import React, { useEffect, useState } from "react";
import { EditOutlined, DeleteOutlined} from "@ant-design/icons";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';

const CardComponent = ({ data, setData }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState('');
  const [body, setBody] = useState('');
  const [selectedId, setSelectedId] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isAdding, setIsAdding] = useState(false);



  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false);
    }, 1000);

    return () => clearTimeout(timer);
  }, [data]);

  const handelEdit = (id) => {
    const dt = data.find((list) => list.id === id);
    if (dt) {
      setTitle(dt.title);
      setBody(dt.body);
      setSelectedId(id);
      setIsAdding(false);  
      setOpen(true);  
    }
  };

  const handelDelete = (id) => {
    if (id > 0) {
      if (window.confirm("Are you sure you want to delete the post?")) {
        const remainingContent = data.filter((list) => list.id !== id);
        setData(remainingContent);
      }
    }
  };

  const handleAddNew = () => {
    setTitle('');
    setBody('');
    setSelectedId(null);
    setIsAdding(true);  
    setOpen(true);  
  };

  const handleSaveChanges = () => {
    if (isAdding) {
      
      const newData = {
        id: data.length + 1,  
        title: title,
        body: body,
      };
      setData([...data, newData]);  
    } else {
      const updatedData = data.map((item) => {
        if (item.id === selectedId) {
          return { ...item, title, body };
        }
        return item;
      });
      setData(updatedData);
    }

    setOpen(false);  
  };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6 m-8">
      {data.map((list, index) => (
        <Card
          loading={loading}
          style={{ minWidth: 300 }}
          key={index}
        >
          <Card.Meta
            avatar={
              <Avatar
                src={`https://api.dicebear.com/7.x/miniavs/svg?seed=${list.userId}`}
              />
            }
            title={list.title}
            description={<p className="line-clamp-4 pb-2 min-h-24">{list.body}</p>}
          />
          <div className="flex flex-row justify-center gap-52 pt-3 mt-3 border-t-2">
            <EditOutlined
              className="cursor-pointer hover:text-blue-500"
              key="edit"
              onClick={() => handelEdit(list.id)}
            />
            <DeleteOutlined
              onClick={() => handelDelete(list.id)}
              className="cursor-pointer hover:text-red-500"
              key="delete"
            />
          </div>
        </Card>
      ))}
      <Modal
        title={isAdding ? "Add New Item" : "Edit The Content"}  
        centered
        open={open}
        onOk={handleSaveChanges}  
        onCancel={() => setOpen(false)} 
        width={1000}
      >
        <div>
          <p className="font-semibold">Title:</p>
          <input
            className="w-full mt-3 p-2 rounded outline outline-2 outline-blue-500"
            type="text"
            placeholder="Enter Title"
            onChange={(e) => setTitle(e.target.value)}
            value={title}
          />
        </div>
        <div>
          <p className="font-semibold mt-3">Body:</p>
          <textarea
            className="w-full mt-3 p-2 rounded outline outline-2 outline-blue-500"
            name="body"
            placeholder="Enter Description"
            onChange={(e) => setBody(e.target.value)}
            value={body}
          ></textarea>
        </div>
      </Modal>
      <FloatButton className="sm:w-16 sm:h-16 md:w-20 md:h-20 group hover:bg-green-600" icon={<FontAwesomeIcon className="group-hover:text-white" icon={faPlus} />} onClick={handleAddNew}  />
    </div>
  );
};

export default CardComponent;
