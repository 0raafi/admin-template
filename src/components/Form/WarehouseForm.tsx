import React, { useEffect } from 'react';
import { Card, Form, message } from 'antd';
import { useNavigate, useParams } from '@umijs/max';
import { FooterToolbar, PageContainer, ProForm, ProFormDigit, ProFormSelect, ProFormText, ProFormTextArea, ProFormUploadButton } from '@ant-design/pro-components';

import { location } from '@/services/nameApps/location';
import { addWarehouse, updateWarehouse, warehouseById } from '@/services/nameApps/warehouse';

export interface WarehouseFormProps {
  type: FormType
}
function WarehouseForm(props: WarehouseFormProps) {
  const { type } = props || {};
  const navigate = useNavigate();
  const [form] = Form.useForm();
  const { id = '' } = useParams();
  const titles: any = {
    'create': 'Tambah Warehouse',
    'update': 'Ubah Warehouse',
  }

  const submitTexts: any = {
    'create': 'Simpan',
    'update': 'Ubah',
  }

  async function handleOnSubmitForm(value: API.WarehouseParams) {
    value.locationId = (value as any).location.key;
    let hide: any = null;
    let action: any = addWarehouse;
    let msg = {
      success: 'Created successfully and will refresh soon',
      error: 'Create failed, please try again'
    };

    switch (type) {
      case 'update':
        hide = message.loading('Updating');
        action = updateWarehouse;
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
    const data: any = await warehouseById(id);
    data.location = {
      label: data.location.name,
      value: data.location._id,
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
        <ProForm<API.WarehouseParams>
          initialValues={{ fileUrls: [] }}
          labelAlign="left"
          form={form}
          submitter={{
            searchConfig: {
              resetText: 'Batal',
              submitText: submitTexts[type]
            },
            onReset: () => navigate('/warehouse'),
            render: (_, dom) => <FooterToolbar>{dom}</FooterToolbar>,
          }}
          onFinish={async (value) => {
            const success = await handleOnSubmitForm(value as API.WarehouseParams);
            if (success) {
              navigate('/warehouse')
            }
          }}
        >
          <ProFormText
            required
            rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
            width={600}
            name="name"
            label="Nama Warehouse"
            placeholder="Masukkan nama warehouse"
          />

          <ProFormUploadButton
            max={3}
            // required
            // rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
            name="fileUrls"
            label="Gambar Warehouse"
            listType="picture-card"
            title="Upload"
            buttonProps={{
              children: 'Upload',
            }}
          />

          <ProFormTextArea
            required
            rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
            width={600}
            name="address"
            label="Alamat Warehouse"
            placeholder="Masukkan alamat warehouse"
          />

          <ProForm.Group>
            <ProFormSelect.SearchSelect
              required
              rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
              width={300}
              mode="single"
              name="location"
              label="Kota"
              placeholder="Pilih kota"
              request={async (params) => {
                return (await location({ keyword: params?.keyWords }).then(({ data }) => {
                  return data?.map(({ name, _id }) => ({
                    label: name,
                    value: _id
                  })) as any
                }))
              }}
            />

            <ProFormDigit
              required
              rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
              width={300}
              name="warehouseArea"
              label="Luas Warehouse"
              placeholder="Masukkan luas warehouse"
            />
          </ProForm.Group>

          <ProForm.Group>
            <ProFormText
              required
              rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
              width={300}
              name="sqmInventory"
              label="Sqm Inventory"
              placeholder="Masukkan sqm inventory"
            />

            <ProFormSelect
              required
              rules={[{ required: true, message: 'Kolom ini wajib diisi!' }]}
              mode="tags"
              showSearch={false}
              fieldProps={{
                showArrow: false,
                open: false
              }}
              width={300}
              name="operationalTimes"
              label="Jam Operasional"
              placeholder="Masukkan jam operasional"
            />

            <ProFormText
              name="_id"
              hidden
            />
          </ProForm.Group>
        </ProForm>
      </Card>
    </PageContainer>
  )
}

export default WarehouseForm;
