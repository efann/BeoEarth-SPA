--
-- PostgreSQL database dump
--

-- Dumped from database version 9.5.24
-- Dumped by pg_dump version 9.5.24

SET statement_timeout = 0;
SET lock_timeout = 0;
SET client_encoding = 'UTF8';
SET standard_conforming_strings = on;
SELECT pg_catalog.set_config('search_path', '', false);
SET check_function_bodies = false;
SET xmloption = content;
SET client_min_messages = warning;
SET row_security = off;

--
-- Name: data; Type: SCHEMA; Schema: -; Owner: postgres
--

CREATE SCHEMA data;

ALTER SCHEMA data OWNER TO postgres;

--
-- Name: plpgsql; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS plpgsql WITH SCHEMA pg_catalog;

--
-- Name: EXTENSION plpgsql; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION plpgsql IS 'PL/pgSQL procedural language';

--
-- Name: postgis; Type: EXTENSION; Schema: -; Owner: 
--

CREATE EXTENSION IF NOT EXISTS postgis WITH SCHEMA public;

--
-- Name: EXTENSION postgis; Type: COMMENT; Schema: -; Owner: 
--

COMMENT ON EXTENSION postgis IS 'PostGIS geometry, geography, and raster spatial types and functions';

--
-- Name: UTMZone(public.geometry); Type: FUNCTION; Schema: data; Owner: postgres
--

CREATE FUNCTION data."UTMZone"(public.geometry) RETURNS character varying
    LANGUAGE plpgsql IMMUTABLE
    AS $_$
-- From http://trac.osgeo.org/postgis/wiki/UsersWikiplpgsqlfunctionsDistance
-- Test with http://www.rcn.montana.edu/resources/tools/coordinates.aspx
 DECLARE
     geomgeog public.geometry;
     zone int;
     pref varchar;

 BEGIN
     geomgeog := ST_Transform($1,4326);

     IF (ST_Y(geomgeog)) > 0 THEN
        -- pref := 32600;
        pref = 'N';
     ELSE
        -- pref := 32700;
        pref = 'S';
     END IF;

     zone := floor((ST_X(geomgeog) + 180) / 6) + 1;

     RETURN zone || pref;
 END;
 $_$;


ALTER FUNCTION data."UTMZone"(public.geometry) OWNER TO postgres;

--
-- Name: UTMZoneSRID(public.geometry); Type: FUNCTION; Schema: data; Owner: postgres
--

CREATE FUNCTION data."UTMZoneSRID"(public.geometry) RETURNS integer
    LANGUAGE plpgsql IMMUTABLE
    AS $_$
-- From http://trac.osgeo.org/postgis/wiki/UsersWikiplpgsqlfunctionsDistance
-- Test with http://www.rcn.montana.edu/resources/tools/coordinates.aspx
 DECLARE
     loGeometry public.geometry;
     lnZone int;
     lnPreferance int;

 BEGIN
     loGeometry := ST_Transform($1,4326);

     IF (ST_Y(loGeometry)) > 0 THEN
        lnPreferance := 32600;
     ELSE
        lnPreferance := 32700;
     END IF;

     lnZone := floor((ST_X(loGeometry) + 180) / 6) + 1;

     RETURN (lnZone + lnPreferance);
 END;
 $_$;


ALTER FUNCTION data."UTMZoneSRID"(public.geometry) OWNER TO postgres;

--
-- Data for Name: spatial_ref_sys; Type: TABLE DATA; Schema: public; Owner: postgres
--

COPY public.spatial_ref_sys (srid, auth_name, auth_srid, srtext, proj4text) FROM stdin;
\.


--
-- Name: SCHEMA data; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA data FROM PUBLIC;
REVOKE ALL ON SCHEMA data FROM postgres;
GRANT ALL ON SCHEMA data TO postgres;
GRANT USAGE ON SCHEMA data TO geocalc;

--
-- Name: SCHEMA public; Type: ACL; Schema: -; Owner: postgres
--

REVOKE ALL ON SCHEMA public FROM PUBLIC;
REVOKE ALL ON SCHEMA public FROM postgres;
GRANT ALL ON SCHEMA public TO postgres;
GRANT ALL ON SCHEMA public TO PUBLIC;

--
-- PostgreSQL database dump complete
--

