import React, { useState } from 'react'
import { Outlet } from 'react-router-dom'
import { Container } from 'react-bootstrap'
import ScrollToTop from '../components/ScrollToTop'
import Navbar from '../components/Navbar'

const Layout = () => {
  return (
    <>
      <Navbar />
      <ScrollToTop />
      <main className="w-100 min-vh-100 bg-light">
        <Container className="py-3">
          <Outlet />
        </Container>
      </main>
      <footer className="bg-light text-center pt-5 py-4">
        <p className="mb-0">
          © {new Date().getFullYear()} {' '}
          <a
            href="https://institutpendidikan.ac.id/"
            target="_blank"
            rel="noopener noreferrer"
            className="text-decoration-none text-dark"
          >
            Institut Pendidikan Indonesia Garut
          </a>
          .
        </p>
      </footer>
    </>
  )
}

export default Layout
