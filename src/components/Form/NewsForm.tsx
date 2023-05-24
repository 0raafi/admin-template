import React, { useEffect } from 'react';
import { Card, Form, message } from 'antd';
import { useNavigate, useParams } from '@umijs/max';
import { FooterToolbar, PageContainer, ProForm, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';

import { category } from '@/services/serviceName/category';
import { addNews, updateNews, newsById } from '@/services/nameApps/news';

import TextEditor from '../TextEditor';

export interface NewsFormProps {
  type: FormType
}
function NewsForm(props: NewsFormProps) {
  const { type } = props || {};
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id = '' } = useParams();
  const titles: any = {
    'create': 'Tambah News',
    'update': 'Ubah News',
  }

  const submitTexts: any = {
    'create': 'Simpan',
    'update': 'Ubah',
  }

  async function handleOnSubmitForm(value: API.NewsParams) {
    value.articleCategoryId = (value as any).articleCategory.key;
    value.route = "/";
    value.authorName = "Admin";
    let hide: any = null;
    let action: any = addNews;
    let msg = {
      success: 'Created successfully and will refresh soon',
      error: 'Create failed, please try again'
    };

    switch (type) {
      case 'update':
        hide = message.loading('Updating');
        action = updateNews;
        msg = {
          success: 'Updated successfully and will refresh soon',
          error: 'Update failed, please try again'
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

  async function handlePatchForm() {
    const data: any = await newsById(id);
    data.articleCategory = {
      label: data.articleCategory.name,
      value: data.articleCategory._id,
    }
    form.setFieldsValue(data);
  }

  useEffect(() => {
    if (id && type === 'update') {
      handlePatchForm()
    }
  }, []);


  return (
    <PageContainer title={titles[type]}>
      <Card>
        <ProForm<API.NewsParams>
          initialValues={{ fileUrls: ['jeje.svg'] }}
          labelAlign="left"
          form={form}
          submitter={{
            searchConfig: {
              resetText: 'Batal',
              submitText: submitTexts[type]
            },
            onReset: () => navigate('/news'),
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={async (value) => {
            const success = await handleOnSubmitForm(value as API.NewsParams);
            if (success) {
              navigate('/news')
            }
          }}
        >
          <ProFormText
            required
            rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
            width={600}
            name="title"
            label="Judul"
            placeholder="Masukkan judul"
          />

          <ProFormSelect.SearchSelect
            required
            rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
            width={600}
            mode="single"
            name="articleCategory"
            label="Kateogri"
            placeholder="Pilih kategori"
            request={async (params) => {
              return (await category({ keyword: params?.keyWords }).then(({ data }) => {
                return data?.map(({ name, _id }) => ({
                  label: name,
                  value: _id
                })) as any
              }))
            }}
          />

          <ProFormTextArea
            required
            rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
            width={600}
            name="caption"
            label="Caption"
            placeholder="Masukkan caption"
          />

          <ProFormUploadButton
            max={3}
            // required
            // rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
            name="fileUrls"
            label="Gambar News"
            listType="picture-card"
            title="Upload"
            buttonProps={{
              children: 'Upload',
            }}
          />

          <ProForm.Item
            name="description"
            label="Deskripsi"
          >
            <TextEditor />
          </ProForm.Item>

          <ProFormText
            name="_id"
            hidden
          />
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default NewsForm;
