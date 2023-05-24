import React, { useRef, useState } from 'react';
import { Button, Form, message } from 'antd';
import {
  PageContainer,
  ProTable,
  ModalForm,
  ProFormText
} from '@ant-design/pro-components';
import { PlusOutlined } from '@ant-design/icons';
import type { ActionType, ProColumns } from '@ant-design/pro-components';
import { addCategory, deleteCategory, category, updateCategory } from '@/services/serviceName/category';
import { Access, useModel } from '@umijs/max';
import access from '@/access';

async function handleOnSubmitForm(value: API.CategoryParams, type?: FormType) {
  let hide: any = null;
  let action: any = addCategory;
  let msg = {
    success: 'Created successfully and will refresh soon',
    error: 'Create failed, please try again'
  };

  switch (type) {
    case 'update':
      hide = message.loading('Updating');
      action = updateCategory;
      msg = {
        success: 'Updated successfully and will refresh soon',
        error: 'Update failed, please try again'
      }
      break;
    case 'delete':
      hide = message.loading('Deleting');
      action = deleteCategory;
      msg = {
        success: 'Deleted successfully and will refresh soon',
        error: 'Delete failed, please try again'
      }
      break;

    default:
      hide = message.loading('Creating');
      break;
  }

  try {
    await action(value)
    hide();
    message.success(msg.success);
    return true;
  } catch (error) {
    hide();
    message.error(msg.error);
    return false;
  }
}

const Category: React.FC = () => {
  const actionRef = useRef<ActionType>();
  const { initialState } = useModel('@@initialState');
  const [openModalForm, setOpenModalForm] = useState(false);
  const [formType, setFormType] = useState<FormType>('create');
  const [form] = Form.useForm();
  const modalFormValue = {
    title: {
      'create': 'Tambah Kategori Berita',
      'update': 'Ubah Kategori Berita',
      'delete': 'Hapus Kategori Berita',
    },
    submitTetx: {
      'create': 'Simpan',
      'update': 'Ubah',
      'delete': 'Hapus',
    },
    danger: {
      'create': false,
      'update': false,
      'delete': false,
    },
  }

  function handleOnAction(item: API.CategoryItem, formType: FormType) {
    setFormType(formType);
    form.setFieldsValue(item);
    setOpenModalForm(true);
  }

  const columns: ProColumns<API.CategoryItem>[] = [
    {
      title: 'Nama',
      dataIndex: 'name',
    },
    {
      hideInSetting: true,
      dataIndex: '_id',
      valueType: 'option',
      width: '184px',
      align: 'center',
      render: (_, record) => [
        <Access key="update" accessible={access(initialState).canUpdateCategory as boolean}>
          <Button
            type="default"
            onClick={() => handleOnAction(record, 'update')}
          >
            Ubah
          </Button>
        </Access>,
        <Access key="delete" accessible={access(initialState).canDeleteCategory as boolean}>
          <Button
            danger
            type="primary"
            key="delete"
            onClick={() => handleOnAction(record, 'delete')}
          >
            Hapus
          </Button>
        </Access>,
      ],
    }
  ];

  return (
    <PageContainer>
      <ProTable<API.CategoryItem, API.PageParams>
        actionRef={actionRef}
        rowKey="key"
        search={false}
        options={{
          search: {
            placeholder: 'Search Name'
          },
        }}
        toolBarRender={() => [
          <Access key="add-category" accessible={access(initialState).canCreateCategory as boolean}>
            <Button
              type="primary"
              key="primary"
              onClick={() => handleOnAction(null as any, 'create')}
            >
              <PlusOutlined /> Tambah Kategori Berita
            </Button>
          </Access>,
        ]}
        request={category}
        columns={columns}
      />

      <ModalForm<API.CategoryParams>
        form={form}
        title={modalFormValue.title[formType]}
        width="400px"
        open={openModalForm}
        onOpenChange={setOpenModalForm}
        submitter={{
          submitButtonProps: {
            danger: modalFormValue.danger[formType]
          }
        }}
        modalProps={{
          cancelText: 'Batal',
          okText: modalFormValue.submitTetx[formType],
          onCancel: () => {
            setOpenModalForm(false);
            form.resetFields();
          }
        }}
        onFinish={async (value) => {
          const success = await handleOnSubmitForm(value as API.CategoryParams, formType);
          if (success) {
            setOpenModalForm(false);
            form.resetFields();
            if (actionRef.current) {
              actionRef.current.reload();
            }
          }
        }}
      >
        {
          formType !== 'delete' && (
            <ProFormText
              width="md"
              name="name"
              label="Nama Kategori Berita"
            />
          )
        }
        {
          formType === 'delete' && (
            <h3 style={{
              margin: '20px 0'
            }}>Are you sure you want to delete this news category?</h3>
          )
        }
        <ProFormText
          width="md"
          name="_id"
          hidden
        />
      </ModalForm>
    </PageContainer>
  );
};

export default Category;
