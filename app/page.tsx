"use client";
import Image from 'next/image'
import { Inter } from 'next/font/google'
import styles from './page.module.css'
import * as signalR from "@microsoft/signalr";

import React, { useEffect, useState } from 'react';
import {
  MenuFoldOutlined,
  MenuUnfoldOutlined,
  UploadOutlined,
  UserOutlined,
  VideoCameraOutlined,
} from '@ant-design/icons';
import { Layout, Menu, theme } from 'antd';

const { Header, Sider, Content } = Layout;
const inter = Inter({ subsets: ['latin'] })

export default function Home() {
  const [collapsed, setCollapsed] = useState(false);
  const {
    token: { colorBgContainer },
  } = theme.useToken();

  useEffect(() =>
  {
    console.log("fetch items!")
    var connection = connectToHub();
    try {
      connection.start().then(() => console.log(`connected!`)).catch(err => console.log(err))
      console.log("SignalR Connected.");
      // item_view_6409e5f5222c299ae2afc6f1_640565f223f502c4faa94647

      // const eventID = `item_view_6409e5f5222c299ae2afc6f1_640565f223f502c4faa94647`;
      
      // prod
      const eventID = `item_view_63c932b446335ebbbb8e4535_5c355eeef256ee000743dcf7`;

      // stg
      // const eventID = `item_view_62907993e1e0f9e44b1e585a_5af30766baa8df0007918ed8`;
      connection.on(eventID, (msg) =>
      {
        console.log(msg)
      })
    } catch (err) {
        console.log(err);
        // setTimeout(start, 5000);
    }
    connection.onclose(async () => {
        // await start();
        console.log("Connection closed!!!")
    });

  }, [])

  const connectToHub = (): signalR.HubConnection => {
    const connection = new signalR.HubConnectionBuilder()
    // .withUrl("/hub?token=eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE2Nzg3MDc5NjQsImlhdCI6MTY3ODM2MjM2NCwic3ViIjoiNjQwNTY1ZjIyM2Y1MDJjNGZhYTk0NjQ3IiwidW4iOiJqLnNvbGl2YSJ9.nhmMHknbSXeA_jjVwtpnMhyVhLkaVaIs-eD_G2tqgWGuaesbi4vC7FyvPHV3eadPQUOx6jyao3K2GH30cNTq4NQjbvRUo7EaEvYgyr3UsfO6RgmZUldrZxuj682RveRBg4W0-WGuLkDYp5OOM1MRO2oz9_2amK1YuK7to3WKzrHhuVAAj8aG-6Ai5PM9MoeaUiFPDBCf9JcYdSWFxGnx84oO1DQ59qT21AUpQz8SJq9JOMScKcalEMVpppVAPL0dOV6pHHJrw5aUOsyJsfaCzaBhdkkUVoxzAuxYhYFqBZdN89G_uYz8e-UDKFlmyOCgmJ4bYCwrA4JVt5J9NsC5fQ", {
      // prod
      .withUrl("https://pubsub.hexabase.com/hub?token=eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjI2Mjc4Nzc3OTEsImlhdCI6MTY4MTc5Nzc5MSwic3ViIjoiNWMzNTVlZWVmMjU2ZWUwMDA3NDNkY2Y3IiwidW4iOiIifQ.bDDQqiMmMzL7BSbsyC4b_WA47aoNmcfcilWFTDhsCdeEnIQU7IVwcRO1-yRb_BLsEhn487CSAiYNWIx2j5LyaraqE6tLbTTUz3RCgojpNUEX8lIgDiYBFLkArjKZeWkB5HwCFBIx-QWNwKCoXP3GyujZSOKPRGg_4Bay5h8Sz24dZbugHN2cOpPdSPnTxje_StDRwjKINjs1URWDtgOSC2uR8zqU91IHQ2HlAta7pHQ2fTaASQEuFdYc50tLAcNdpxYegqlzt5_DRLLwSucj0gv4-xLlGcziruV7gdyzEKO4Z8NkJMJfSNUfpM_4PskweSf5LuoQ8-XLwWLz97OdFg", {
        skipNegotiation: true,
        transport: signalR.HttpTransportType.WebSockets
      // stg
      // .withUrl("/hub?token=eyJhbGciOiJSUzUxMiIsInR5cCI6IkpXVCJ9.eyJleHAiOjUyNzkwNTM5MTcsImlhdCI6MTY3OTA1MzkxNywic3ViIjoiNWFmMzA3NjZiYWE4ZGYwMDA3OTE4ZWQ4IiwidW4iOiJ1c2VybmFtZSB0ZXN0In0.x_G02Xyt_gE0qSo2bNSm7dZeZraFkomkP-fyqDHUfbWtO52DPB8nirypPmPL7WwFOQqzVTGqdJIgIrjdS8GxsTRF_Q3Mqp9S6g_JZe-YpJYYRo2o1J1Ck5WvgGxEy8kJAIbR-Ne0qvV1x6D14AVQ6gfY70y6JcrqzWyCx5stDxUEFUhLqb_g2uJCPpugcoFASa0cXx6yGpcTgOMNpnnW8A_T4pkDEy37yA3SSp_WhWucVo6SW7gPQFqNFxNtTCdAnDLfDvZyBZdun4LMRvem4RaFea-Fswd9A-mNPE7S8Swe-xO9rxWDUzehB6C3agAizEsKHUcy5J2qq-5SBxsefg", {
      // accessTokenFactory: () => {
      //   return `Bearer test`
      // }
    })
    .withAutomaticReconnect()
    .configureLogging(signalR.LogLevel.Information)
    .build();
    return connection;
  }

  // item_view_6409e5f5222c299ae2afc6f1_640565f223f502c4faa94647

  return (
    <Layout>
      <Sider trigger={null} collapsible collapsed={collapsed}>
        <div className="logo" />
        <Menu
          theme="dark"
          mode="inline"
          defaultSelectedKeys={['1']}
          items={[
            {
              key: '1',
              icon: <UserOutlined />,
              label: 'nav 1',
            },
            {
              key: '2',
              icon: <VideoCameraOutlined />,
              label: 'nav 2',
            },
            {
              key: '3',
              icon: <UploadOutlined />,
              label: 'nav 3',
            },
          ]}
        />
      </Sider>
      <Layout className="site-layout">
        <Header style={{ padding: 0, background: colorBgContainer }}>
          {React.createElement(collapsed ? MenuUnfoldOutlined : MenuFoldOutlined, {
            className: 'trigger',
            onClick: () => setCollapsed(!collapsed),
          })}
        </Header>
        <Content
          style={{
            margin: '24px 16px',
            padding: 24,
            minHeight: 280,
            background: colorBgContainer,
          }}
        >
          Content
        </Content>
      </Layout>
    </Layout>
  )
}
