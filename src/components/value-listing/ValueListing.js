"use client";

import { useEffect, useState } from "react";
import FeaturedValue from "../featured-value/FeaturedValue";
import ProposeValueButton from "../propose-value-button/ProposeValueButton";
import SearchControls from "../search-controls/SearchControls";
import ValueCard from "../value-card/ValueCard";
import styles from "./value-listing.module.scss";
import Carousel from "../carousel/Carousel";

const FEATURED_CARD_COLORS = ["pink", "blue", "green", "red", "gray"];

const ValueListing = () => {
  const [featuredValues, setFeaturedValues] = useState([]);
  const [values, setValues] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [sortBy, setSortBy] = useState("stake");
  const [showOnlyVoted, setShowOnlyVoted] = useState(false);

  const pageSize = 5;

  useEffect(() => {
    const fetchValues = async () => {
      setIsLoading(true);
      try {
        const response = await fetch(
          `/values?page=${currentPage}&pageSize=${pageSize}&sortBy=${sortBy}${
            showOnlyVoted ? "&address=user123" : ""
          }`
        );
        const data = await response.json();

        if (currentPage === 1) {
          setValues(data.values);
        } else {
          setValues((prev) => [...prev, ...data.values]);
        }

        setHasMore(currentPage + 1 < data.totalPages);
      } finally {
        setIsLoading(false);
      }
    };

    fetchValues();
  }, [currentPage, sortBy, showOnlyVoted]);

  useEffect(() => {
    if (!values || !values.length) {
      setFeaturedValues([]);
      return;
    }

    setFeaturedValues(values.slice(0, 5));
  }, [values]);

  const handleLoadMore = () => {
    if (!isLoading) {
      setCurrentPage((prev) => prev + 1);
    }
  };

  const handleSortChange = (newSortBy) => {
    setSortBy(newSortBy);
    setCurrentPage(1);
  };

  const handleFilterChange = (checked) => {
    setShowOnlyVoted(checked);
    setCurrentPage(1);
  };

  const showLoadMore = values.length > 0 && hasMore;

  const nonFeaturedValues = values.filter(
    (value) => !featuredValues.find((featured) => featured.id === value.id)
  );

  return (
    <div className={styles.listing}>
      <div className={styles.toolbar}>
        <SearchControls
          onSortChange={handleSortChange}
          onFilterChange={handleFilterChange}
        />
        <div>
          <ProposeValueButton />
        </div>
      </div>
      <div className={styles.featuredValues}>
        {featuredValues.map((value, index) => (
          <FeaturedValue
            key={value.id}
            valueId={value.id}
            title={value.valueName}
            description={value.description}
            totalAmount={value.totalStaked}
            totalUsers={value.totalUsers}
            forumPost={value.forumPost}
            color={FEATURED_CARD_COLORS[index]}
          />
        ))}
      </div>
      <Carousel className={styles.featuredValuesMobile}>
        {featuredValues.map((value, index) => (
          <div key={value.id} className={styles.carouselItem}>
            <FeaturedValue
              valueId={value.id}
              title={value.valueName}
              description={value.description}
              totalAmount={value.totalStaked}
              totalUsers={value.totalUsers}
              forumPost={value.forumPost}
              color={FEATURED_CARD_COLORS[index]}
            />
          </div>
        ))}
      </Carousel>
      <div className={styles.values}>
        {nonFeaturedValues.map((value) => (
          <ValueCard
            key={value.id}
            valueId={value.id}
            title={value.valueName}
            description={value.description}
            totalAmount={value.totalStaked}
            totalUsers={value.totalUsers}
            forumPost={value.forumPost}
          />
        ))}
      </div>
      {showLoadMore && (
        <div className={styles.loadMore}>
          <button
            className={styles.loadMoreButton}
            onClick={handleLoadMore}
            disabled={isLoading}
          >
            {isLoading ? "Loading..." : "Load More"}
          </button>
        </div>
      )}
    </div>
  );
};

export default ValueListing;
